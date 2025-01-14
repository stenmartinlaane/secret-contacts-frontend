<script setup lang="ts">
const props = defineProps<{
  contacts: Contact[];
  handleDeleteContact: (id: number) => Promise<void>;
  handleUpdateContact: (contact: Contact) => Promise<void>;
  loadingStatus: "loading" | "failed" | "finished";
}>();
import { ref } from "vue";
import { Contact } from "../lib/validations";
import { columns } from "./contacts/columns";
import DataTable from "./contacts/data-table.vue";
const tableColumns = columns(
  props.handleDeleteContact,
  props.handleUpdateContact
);
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :data="props.contacts"
    :loadingStatus="loadingStatus"
  />
</template>
