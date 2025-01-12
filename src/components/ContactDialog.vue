<script setup lang="ts">
const props = defineProps<{
  id?: number;
  type: "add" | "edit";
  contact?: ContactEssentials;
  onSubmit:
    | ((contact: Contact) => Promise<void>)
    | ((contact: ContactEssentials) => Promise<void>);
}>();
import { PropType, ref } from "vue";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ContactEssentials } from "../lib/types";
import { Contact, contactSchema } from "../lib/validations";
const contact = props.contact;
const name = ref(contact ? contact.name : "");
const codeName = ref(contact ? contact.codeName : "");
const phoneNumber = ref(contact ? contact.phoneNumber : "");

const actionName = props.type === "edit" ? "Muuda Kontakti" : "Lisa Kontakt";
const submitButtonName = props.type === "edit" ? "Muuda" : "Lisa";

const handleSubmit = async (contact: ContactEssentials) => {
  const id = props.id!;
  await props.onSubmit({ ...contact, id });
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
            <Label for="name" class="text-right"> Nimi </Label>
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
            <Button type="submit">
              {{ submitButtonName }}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
