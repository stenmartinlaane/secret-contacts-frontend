<script setup lang="ts">
// const props = defineProps({
//   id: {
//     type: Number,
//     required: true,
//   },
//   handleDeleteContact: {
//     type: Function as PropType<(id: number) => Promise<void>>,
//   },
// });
const props = defineProps<{
  id: number;
  handleDeleteContact: (id: number) => Promise<void>
}>();
import Button from './ui/button/Button.vue';
import {TrashIcon} from '@radix-icons/vue';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { PropType } from 'vue';

const handleDelete = async () => {
  props.handleDeleteContact(props.id);
  // try {
  //   const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts/${props.id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to make DELETE request');
  //   }

  //   const result = await response.json();
  //   console.log(result)
  //   // deleteStatus.value = result; // Store the response
  //   console.log('Delete request successful:', result);
  // } catch (error) {
  //   console.error('Error with DELETE request:', error);
  // }
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">
        <TrashIcon/>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Kas sa oled kindel, et soovid kontakti kustutada?</AlertDialogTitle>
        <AlertDialogDescription>
          Seda tegevust ei saa tagasi võtta. See kustutab kontakti igaveseks.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Katkesta</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete">Kinnita</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

