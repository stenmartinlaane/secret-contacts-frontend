<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  handleUpdateContact: {
    type: Function as PropType<(contact: Contact) => Promise<void>>,
    required: true,
  },
});
import { PropType } from "vue";
import ContactDialog from "./ContactDialog.vue";
import { Contact } from "../lib/validations";
</script>

<template>
  <ContactDialog type="edit" :onSubmit="props.handleUpdateContact" :id="props.id"></ContactDialog>
</template>
