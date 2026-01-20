import * as yup from "yup";

export const optionsSchema = yup.object({
  playerName: yup
    .string()
    .required("Player name is required")
    .min(2, "Min 2 characters")
    .max(20, "Max 20 characters"),
  speedMs: yup
    .number()
    .typeError("Speed must be a number")
    .required("Speed is required")
    .min(250, "Min 250 ms")
    .max(1500, "Max 1500 ms"),
  soundOn: yup.boolean().required(),
});
