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
  handleDeleteContact: (id: number) => Promise<void>;
}>();
import Button from "./ui/button/Button.vue";
import { TrashIcon } from "@radix-icons/vue";
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
} from "./ui/alert-dialog";
import { PropType } from "vue";

const handleDelete = async () => {
  props.handleDeleteContact(props.id);
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">
        <TrashIcon />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Kas sa oled kindel, et soovid kontakti kustutada?</AlertDialogTitle
        >
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
