<script setup lang="ts">
import ContactDialog from "./ContactDialog.vue";
const handleSubmit = () => {
  console.log("Adding contact")
}
</script>

<template>
  <ContactDialog type="add" :onSubmit="handleSubmit" ></ContactDialog>
</template>
