import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import * as fs from "fs";
import logger from "./logger";

const GOOGLE_CREDENTIALS_FILE_PATH =
  process.env.GOOGLE_CREDENTIALS_FILE_PATH || "";
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || "";

const credentials = JSON.parse(
  fs.readFileSync(GOOGLE_CREDENTIALS_FILE_PATH, "utf-8")
);

const auth = new GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export const findLastFilledRow = async (): Promise<number> => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:A",
  });
  const rows = response.data.values || [];
  return rows.length;
};

export const saveToSheet = async (values: string[][]): Promise<void> => {
  const lastFilledRow = await findLastFilledRow();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!A${lastFilledRow + 1}`,
    valueInputOption: "RAW",
    resource: { values },
  } as any);
};

export const saveAfterLastFilledRow = async (
  row: string[],
  firstRow?: string[]
): Promise<void> => {
  if (!firstRow) {
    saveToSheet([row]);
  } else {
    const lastFilledRow = await findLastFilledRow();
    if (lastFilledRow === 0) {
      saveToSheet([firstRow, row]);
    } else {
      saveToSheet([row]);
    }
  }
};
