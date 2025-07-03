import z from "zod";

const updateSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is requried" })
      .min(1, { message: "Name must be at least 3 characters" })
      .optional(),
    contactNumber: z
      .string({ required_error: "Contact Number is requried" })
      .min(1, { message: "Contact Number must be at least 10 characters" })
      .max(11, { message: "Contact Number must be at most 11 characters" })
      .optional(),
  }),
});

export const adminValidation = { updateSchema };
