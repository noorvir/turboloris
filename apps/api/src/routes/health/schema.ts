import { z } from "zod";

export const HealthSchema = z
  .object({
    data: z.object({
      store: z.object({
        healthy: z.boolean(),
      }),
      search: z.object({
        healthy: z.boolean(),
      }),
    }),
  })
  .openapi("HealthSchema");
