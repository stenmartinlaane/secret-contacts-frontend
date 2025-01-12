import type { Contact } from "@/lib/validations";
import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import DeleteContactButton from "../DeleteContactButton.vue";
import EditContactButton from "../EditContactButton.vue";

export const columns = (handleDelete: (id: number) => Promise<void>, handleUpdate: (contact: Contact) => Promise<void>): ColumnDef<Contact>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Nimi', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return h("div", { class: "text-left font-medium" }, name);
    },
  },
  {
    accessorKey: "codeName",
    header: () => h("div", { class: "text-right" }, "Kood-nimi"),
    cell: ({ row }) => {
      const codeName: string = row.getValue("codeName");
      return h("div", { class: "text-right font-medium" }, codeName);
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => h("div", { class: "text-right" }, "Telefoninumber"),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phoneNumber");
      return h("div", { class: "text-right font-medium" }, phoneNumber);
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right" }, "Toimingud"),
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return h("div", { class: "text-right font-medium flex gap-4 justify-end" }, [
        h(EditContactButton, {
          id,
          handleUpdateContact: handleUpdate, // Passing handleUpdate to EditContactButton
        }),
        h(DeleteContactButton, {
          id,
          handleDeleteContact: handleDelete, // Passing handleDelete to DeleteContactButton
        }),
      ]);
    },
  },
];
