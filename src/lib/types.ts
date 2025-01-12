import type { Contact } from "./validations";

export type ContactEssentials = Omit<Contact, "id">;
