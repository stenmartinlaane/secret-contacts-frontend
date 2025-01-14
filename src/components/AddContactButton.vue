<script setup lang="ts">
import { PropType } from "vue";
import { ContactEssentials } from "../lib/types";
import ContactDialog from "./ContactDialog.vue";
const props = defineProps({
  onClick: {
    type: Function as PropType<(contact: ContactEssentials) => Promise<void>>,
    required: true,
  },
});
</script>

<template>
  <ContactDialog type="add" :onSubmit="props.onClick"></ContactDialog>
</template>
