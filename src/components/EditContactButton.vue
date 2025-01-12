<script setup lang="ts">
const props = defineProps<{
  id: number;
  handleUpdateContact: (contact: Contact) => Promise<void>;
  contact: ContactEssentials;
}>();
import { PropType } from "vue";
import ContactDialog from "./ContactDialog.vue";
import { Contact } from "../lib/validations";
import { ContactEssentials } from "../lib/types";
</script>

<template>
  <ContactDialog
    type="edit"
    :onSubmit="props.handleUpdateContact"
    :id="props.id"
    :contact="contact"
  ></ContactDialog>
</template>
