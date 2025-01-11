<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
import ContactDialog from "./ContactDialog.vue";
const handleSubmit = async () => {
  console.log(props.id)
  try {
    let data = {}
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to make POST request');
    }

    const result = await response.json();
    // postData.value = result; // Store the response
    console.log('Post request successful:', result);
  } catch (error) {
    console.error('Error with POST request:', error);
  }
}
</script>

<template>
  <ContactDialog type="edit" :onSubmit="handleSubmit"></ContactDialog>
</template>

