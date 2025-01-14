<script setup lang="ts">
const props = defineProps<{
  id?: number;
  type: "add" | "edit";
  contact?: ContactEssentials;
  onSubmit:
    | ((contact: Contact) => Promise<void>)
    | ((contact: ContactEssentials) => Promise<void>);
}>();
import { computed, ref, watch } from "vue";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ContactEssentials } from "../lib/types";
import { Contact } from "../lib/types";
const name = ref("");
const codeName = ref("");
const phoneNumber = ref("");
const errorMessage = computed(() => {
  if (name.value || codeName.value || phoneNumber.value) {
    return "";
  }
  return "Vähemalt üks väli peab olema täidetud!";
});
const error = computed(() => {
  return errorMessage.value !== "";
});

watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      name.value = newContact.name;
      codeName.value = newContact.codeName;
      phoneNumber.value = newContact.phoneNumber;
    }
  },
  { immediate: true }
);

const actionName = props.type === "edit" ? "Muuda kontakti" : "Lisa kontakt";
const submitButtonName = props.type === "edit" ? "Muuda" : "Lisa";

const handleSubmit = async (contact: ContactEssentials) => {
  const id = props.id!;
  await props.onSubmit({ ...contact, id });
  name.value = "";
  codeName.value = "";
  phoneNumber.value = "";
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ actionName }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>{{ actionName }}</DialogTitle>
      </DialogHeader>

      <form
        @submit.prevent="
          handleSubmit({
            name: name,
            codeName: codeName,
            phoneNumber: phoneNumber,
          })
        "
      >
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Pärisnimi </Label>
            <Input id="name" v-model="name" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="codeName" class="text-right"> Kood-nimi </Label>
            <Input id="codeName" v-model="codeName" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phoneNumber" class="text-right"> Telefoninumber </Label>
            <Input id="phoneNumber" v-model="phoneNumber" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="submit" :disabled="error">
              {{ submitButtonName }}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
