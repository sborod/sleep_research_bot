import { createActor, createMachine } from "xstate";

export const surveyMachine = createMachine({
  id: "promise",
  initial: "waiting_agree",
  states: {
    waiting_agree: {
      on: {
        AGREE: { target: "waiting_email" },
      },
    },
    waiting_email: {
      on: {
        SEND_EMAIL: { target: "giving_forms" },
      },
    },
    giving_forms: {},
  },
});
