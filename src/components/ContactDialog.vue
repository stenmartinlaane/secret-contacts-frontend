<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    validator: (value: string) => value === "edit" || value === "add",
  },
  onSubmit: {
    type: Function as PropType<(() => void) | undefined>,
    default: undefined,
  },
});
import { PropType } from 'vue';
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
const actionName = props.type === "edit" ? "Muuda Kontakti" : "Lisa Kontakt";
const submitButtonName = props.type === "edit" ? "Muuda" : "Lisa";
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
        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>
      <form @submit.prevent="props.onSubmit">
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Nimi
          </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="codeName" class="text-right">
            Kood-nimi
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">
            Telefoninumber
          </Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {{ submitButtonName }}
        </Button>
      </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>