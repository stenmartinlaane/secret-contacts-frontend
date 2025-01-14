import { toast } from "vue3-toastify";
import type { ApiCallResult, Contact, ContactEssentials, ServerAddResponse, ServerDeleteResponse, ServerResponse, ServerUpdateResponse } from "./types";
import {
  ContactsSchema,
  ServerAddResponseSchema,
  ServerDeleteResponseSchema,
  ServerUpdateResponseSchema,
} from "./validations";

class ApiCallResultFactory<T> {
  noServerResponse(): ApiCallResult<T> {
    return {
      result: "noServerResponse",
    };
  }

  badServerResponse(error?: string): ApiCallResult<T> {
    return {
      result: "badServerResponse",
      error,
    };
  }

  successfulResponse(data: T): ApiCallResult<T> {
    return {
      result: "successfulResponse",
      data,
    };
  }
}

const handleResponse = <T>(
  response: ApiCallResult<T>,
  operationScucessMessage?: string,
  operationFailMessage?: string
): boolean => {
  if (response.result === "noServerResponse") {
    if (operationFailMessage) {
      toast(operationFailMessage, { type: toast.TYPE.ERROR });
    }
    return false;
  } else if (response.result === "badServerResponse") {
    toast(
      response.error ||
        "Serveri viga, midagi läks valesti. Värskenda lehte, et saada uuendatud andmed.",
      { type: toast.TYPE.ERROR }
    );
    return false;
  } else if (response.result === "successfulResponse") {
    if (operationFailMessage) {
      toast(operationScucessMessage, { type: toast.TYPE.SUCCESS });
    }
    return true;
  } else {
    toast("Serveri viga, midagi läks valesti.. Värskenda lehte, et saada uuendatud andmed.", { type: toast.TYPE.ERROR });
    return false;
  }
};

const apiCall = async <T>(
  url: string,
  schema: any,
  options?: RequestInit
): Promise<ApiCallResult<T>> => {
  const factory = new ApiCallResultFactory<T>();
  try {
    let response;
    if (options) {
      response = await fetch(url, options);
    } else {
      response = await fetch(url);
    }
    if (!response.ok) {
      const data = await response.json();
      const parsedData = schema.safeParse(data);
      if (parsedData.success) {
        const res = parsedData.data as ServerResponse;
        if (res.errorMessage) {
          return factory.badServerResponse(res.errorMessage);
        }
      }
      return factory.badServerResponse();
    }
    const data = await response.json();
    const parsedData = schema.safeParse(data);
    if (!parsedData.success || !data) {
      return factory.badServerResponse();
    }
    return factory.successfulResponse(data);
  } catch (error) {
    console.error(error);
    return factory.noServerResponse();
  }
};

export const deleteContactFromDatabase = async (
  id: number
): Promise<boolean> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await apiCall<ServerDeleteResponse>(
    `${baseUrl}/contacts/${id}`,
    ServerDeleteResponseSchema,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
  const isSuccess = handleResponse(
    response,
    "Kontakt kustutatud.",
    "Kontakti kustutamine ei õnnestunud."
  );
  return isSuccess;
};

export const addContactToDatabase = async (contact: ContactEssentials) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await apiCall<ServerAddResponse>(
    `${baseUrl}/contacts`,
    ServerAddResponseSchema,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }
  );
  const isSuccess = handleResponse(
    response,
    "Kontakt lisatud.",
    "Kontakti lisamine ei õnnestunud."
  );
  return isSuccess ? response.data!.result : null;
};

export const fetchAllContactsFromDatabase = async () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await apiCall<Contact[]>(
    `${baseUrl}/contacts`,
    ContactsSchema
  );
  const isSuccess = handleResponse(response);
  return isSuccess ? response.data! : null;
};


export const updateContactInDatabase = async (contact: Contact) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { id, ...contactWithoutId } = contact;
  const response = await apiCall<ServerUpdateResponse>(
    `${baseUrl}/contacts/${id}`,
    ServerUpdateResponseSchema,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactWithoutId),
    }
  );
  const isSuccess = handleResponse(
    response,
    "Kontakt uuendatud.",
    "Kontakti uuendamine ei õnnestunud."
  );
  return isSuccess ? response.data!.result : null;
};
