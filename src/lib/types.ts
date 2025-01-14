import type { Contact } from "./validations";

export type ContactEssentials = Omit<Contact, "id">;

export type ApiCallResult<T> = {
  result: "noServerResponse" | "badServerResponse" | "successfulResponse"
  data?: T;
  error?: string;
};