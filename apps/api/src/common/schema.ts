import { z } from "zod";

export const ErrorSchema = z.object({
  code: z.string().openapi({
    example: "not_found",
  }),
  message: z.string().openapi({
    example: "The provided list does not exist.",
  }),
  requestId: z.string().openapi({
    example: "ade9f87398605cb3456e0b8f4fe28f707c4",
  }),
});
