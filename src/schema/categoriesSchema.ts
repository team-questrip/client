// Generated by ts-to-zod
import { z } from "zod";

export const categorySchema = z.object({
  category: z.string(),
  enumName: z.string(),
});

export const categoryGroupSchema = z.object({
  groupName: z.string(),
  enumName: z.string(),
  categories: z.array(categorySchema),
  placeCounts: z.number(),
});

export const placeCategoriesDataSchema = z.object({
  groupList: z.array(categoryGroupSchema),
});
