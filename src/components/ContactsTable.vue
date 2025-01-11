<script setup lang="ts">
import { Contact } from "../types";
import { onMounted, Ref, ref } from "vue";
import { columns } from "./contacts/columns";
import type { SortingState } from "@tanstack/vue-table";
import DataTable from "./contacts/data-table.vue";
const contacts: Ref<Contact[]> = ref([
  { name: "alex", codeName: "klks", phoneNumber: "20049123321", id: 192 },
  { name: "john", codeName: "asdf", phoneNumber: "8248923", id: 192 },
  { name: "capek", codeName: "kdadfslks", phoneNumber: "839248239", id: 192 },
]);

// const data = ref([])

onMounted(async () => {
  // console.log(process.env.VITE_API_BASE_URL)
  try {
    console.log("here")
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(baseUrl)
    if (!baseUrl) return

    const response = await fetch(baseUrl + "/contacts");
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    contacts.value = data;
    console.log(data)
  } catch (err) {
    console.log(err)
    // error.value = err.message; // Set the error message if an error occurs
  } finally {
    // loading.value = false; // Set loading to false after fetching
  }
});

</script>

<template>
  <DataTable :columns="columns" :data="contacts" />
</template>
