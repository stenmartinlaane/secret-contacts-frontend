<script setup lang="ts">
import AddContactButton from "./components/AddContactButton.vue";
import ContactsTable from "./components/ContactsTable.vue";
import { onMounted, ref, Ref } from "vue";
import { Contact } from "./lib/types";

import {
  addContactToDatabase,
  deleteContactFromDatabase,
  fetchAllContactsFromDatabase,
  updateContactInDatabase,
} from "./lib/api";
import { ContactEssentials } from "./lib/types";

const contacts: Ref<Contact[]> = ref([]);

const handleDeleteContact = async (id: number) => {
  const success = await deleteContactFromDatabase(id);
  if (success) {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  }
};

const handleAddContact = async (contact: ContactEssentials) => {
  const resultContact = await addContactToDatabase(contact);
  if (resultContact) {
    contacts.value = [...contacts.value, resultContact];
  }
};

const handleUpdateContact = async (contact: Contact) => {
  const resultContact = await updateContactInDatabase(contact);
  if (resultContact) {
    contacts.value = contacts.value.map((c) => {
      if (c.id === contact.id) {
        return contact;
      }
      return c;
    });
  }
};

const loadingStatus: Ref<"loading" | "failed" | "finished"> = ref("loading");
const fetchAllContacts = async () => {
  const resultContacts = await fetchAllContactsFromDatabase();
  if (resultContacts) {
    contacts.value = resultContacts;
    loadingStatus.value = "finished";
  } else {
    loadingStatus.value = "failed";
  }
};
onMounted(fetchAllContacts);
</script>

<template>
  <div
    class="text-zinc-900 bg-[#f2f4f6] max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen"
  >
    <h1 class="text-6xl p-8 text-center">Kontaktid</h1>
    <div class="pt-5">
      <div class="flex gap-40">
        <AddContactButton :onClick="handleAddContact"></AddContactButton>
      </div>
      <ContactsTable
        :contacts="contacts"
        :handleDeleteContact="handleDeleteContact"
        :handleUpdateContact="handleUpdateContact"
        :loadingStatus="loadingStatus"
      ></ContactsTable>
    </div>
  </div>
</template>

<style scoped></style>
