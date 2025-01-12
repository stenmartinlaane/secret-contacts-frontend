<script setup lang="ts">
import AddContactButton from "./components/AddContactButton.vue";
import ContactsTable from "./components/ContactsTable.vue";
import { onMounted, ref, Ref } from "vue";
import {
  Contact,
  contactsSchema,
  ServerAddResponseSchema,
  ServerDeleteResponseSchema,
  ServerUpdateResponseSchema,
} from "./lib/validations";
import { ContactEssentials } from "./lib/types";
import { toast } from "vue3-toastify";
// import 'vue3-toastify/dist/index.css';

const contacts: Ref<Contact[]> = ref([]);

const handleDeleteContact = async (id: number) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(baseUrl + `/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast("Kontakti kustutamine ei õnnestunud.", { type: toast.TYPE.ERROR });
      return;
    }
    const data = await response.json();
    const parsedData = ServerDeleteResponseSchema.safeParse(data);
    if (!parsedData.success) {
      console.log("")
    }
    toast("Kontakt kustutatud.", { type: toast.TYPE.SUCCESS });
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  } catch (err) {
    console.log(err);
  } finally {
  }
};

const handleAddContact = async (contact: ContactEssentials) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(baseUrl + "/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      toast("Kontakti lisamine ei õnnestunud.", { type: toast.TYPE.ERROR });
      return;
    }
    const data = await response.json();
    const parsedData = ServerAddResponseSchema.safeParse(data);
    if (!parsedData.success) {
      console.log(parsedData.error);
    }
    toast("Kontakt lisatud.", { type: toast.TYPE.SUCCESS });
    contacts.value = [...contacts.value, parsedData.data!.result];
  } catch (err) {
    console.log(err);
  } finally {
  }
};

const handleUpdateContact = async (contact: Contact) => {
  const { id, ...contactWithoutId } = contact;
  console.log(contactWithoutId);
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(baseUrl + `/contacts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactWithoutId),
    });
    if (!response.ok) {
      toast("Kontakti uuendamine ei õnnestunud.", { type: toast.TYPE.ERROR });
      return;
    }
    const data = await response.json();
    const parsedData = ServerUpdateResponseSchema.safeParse(data);
    console.log(data);
    if (!parsedData.success) {
      console.log(parsedData.error);
    }
    toast("Kontakt uuendatud.", { type: toast.TYPE.SUCCESS });
    contacts.value = contacts.value.map((c) => {
      if (c.id === contact.id) {
        return contact;
      }
      return c;
    }); //parsedData.data is never undefined here
  } catch (err) {
    console.log(err);
  } finally {
  }
};

onMounted(async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(baseUrl + "/contacts");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const parsedData = contactsSchema.safeParse(data);
    if (!parsedData.success) {
      console.log("Wrong data format");
    }
    contacts.value = parsedData.data!; //parsedData.data is never undefined here
  } catch (err) {
    console.log(err);
  } finally {
  }
});
</script>

<template>
  <div
    class="text-zinc-900 bg-[#f2f4f6] max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen"
  >
    <h1 class="text-6xl p-8 text-center">Secret Contacts</h1>
    <div class="pt-5">
      <div class="flex gap-40">
        <AddContactButton :onClick="handleAddContact"></AddContactButton>
      </div>
      <ContactsTable
        :contacts="contacts"
        :handleDeleteContact="handleDeleteContact"
        :handleUpdateContact="handleUpdateContact"
      ></ContactsTable>
    </div>
  </div>
</template>

<style scoped></style>
