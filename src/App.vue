<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Button from "./components/ui/button/Button.vue";
import AddContactButton from "./components/AddContactButton.vue";
import ContactsTable from "./components/ContactsTable.vue";
</script>

<template>
  <div
    class="text-zinc-900 bg-[#e5e8ec] max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen"
  >
    <div class="pt-20">
      <div class="flex gap-40">
        <AddContactButton></AddContactButton>
      </div>
      <ContactsTable></ContactsTable>
    </div>
  </div>
</template>

<style scoped></style>
