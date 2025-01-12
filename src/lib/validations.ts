import { z } from "zod";

export const contactSchema = z.object({
  name: z.string(),
  codeName: z.string(),
  phoneNumber: z.string(),
  id: z.number()
})

export const contactsSchema = z.array(contactSchema);

export type Contact = z.infer<typeof contactSchema>;

const ServerResponseSchema = <T extends z.ZodTypeAny>(resultSchema: T) =>
  z.object({
    result: resultSchema,
    errorMessage: z.string().nullable(),
    success: z.boolean(),
  });

export const ServerDeleteResponseSchema = ServerResponseSchema(z.boolean());
export const ServerAddResponseSchema = ServerResponseSchema(contactSchema);
export const ServerUpdateResponseSchema = ServerResponseSchema(contactSchema);