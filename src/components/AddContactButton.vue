<script setup lang="ts">
const props = defineProps({
  onClick: {
    type: Function as PropType<(contact: ContactEssentials) => Promise<void>>,
    required: true,
  },
});
import { PropType } from "vue";
import { ContactEssentials } from "../lib/types";
import ContactDialog from "./ContactDialog.vue";
const handleSubmit = () => {
  console.log("Adding contact");
};
</script>

<template>
  <ContactDialog type="add" :onSubmit="props.onClick"></ContactDialog>
</template>
