<script setup lang="ts">
const props = defineProps<{
  contacts: Contact[];
  handleDeleteContact: (id: number) => Promise<void>;
  handleUpdateContact: (contact: Contact) => Promise<void>
}>();
import { onMounted, PropType, Ref, ref } from "vue";
import { Contact } from "../lib/validations";
import { columns } from "./contacts/columns";
import DataTable from "./contacts/data-table.vue";
const filteredContacts = ref(props.contacts)
const setFilteredData = (data: Contact[]) => {
  filteredContacts.value = data;
};
const tableColumns = columns(
  props.handleDeleteContact,
  props.handleUpdateContact
);
</script>

<template>
  <DataTable :columns="tableColumns" :data="props.contacts" :setFilteredData="setFilteredData" />
</template>
