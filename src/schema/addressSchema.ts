// Generated by ts-to-zod
import { z } from "zod";

export const addressSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    formattedAddress: z.string(),
  }),
});
