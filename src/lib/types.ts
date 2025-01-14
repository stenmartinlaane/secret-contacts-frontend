import type { z } from "zod";
import type { contactSchema, ServerAddResponseSchema, ServerDeleteResponseSchema, ServerUpdateResponseSchema } from "./validations";

export type ContactEssentials = Omit<Contact, "id">;

export type ApiCallResult<T> = {
  result: "noServerResponse" | "badServerResponse" | "successfulResponse"
  data?: T;
  error?: string;
};

export type Contact = z.infer<typeof contactSchema>;
export type ServerDeleteResponse = z.infer<typeof ServerDeleteResponseSchema>;
export type ServerAddResponse = z.infer<typeof ServerAddResponseSchema>;
export type ServerUpdateResponse = z.infer<typeof ServerUpdateResponseSchema>;
export type ServerResponse =
  | ServerDeleteResponse
  | ServerAddResponse
  | ServerUpdateResponse;