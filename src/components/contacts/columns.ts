import type { Contact } from "../../lib/validations";
import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import DeleteContactButton from "../DeleteContactButton.vue";
import EditContactButton from "../EditContactButton.vue";

export const columns = (
  handleDelete: (id: number) => Promise<void>,
  handleUpdate: (contact: Contact) => Promise<void>
): ColumnDef<Contact>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          h("span", { class: "font-bold text-black" }, "Pärisnimi"),
          h(ArrowUpDown, { class: "ml-2 h-4 w-4 text-black" }),
        ]
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return h("div", { class: "text-left font-medium" }, name);
    },
    sortingFn: (rowA, rowB, columnId) => {
      const nameA = (rowA.getValue("name") as string)?.toLowerCase() || "";
      const nameB = (rowB.getValue("name") as string)?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: "codeName",
    header: () => h("div", { class: "text-left font-bold text-black" }, "Kood-nimi"),
    cell: ({ row }) => {
      const codeName: string = row.getValue("codeName");
      return h("div", { class: "text-left font-medium" }, codeName);
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => h("div", { class: "text-left font-bold text-black"  }, "Telefoninumber"),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phoneNumber");
      return h("div", { class: "text-left font-medium" }, phoneNumber);
    },
  },
  {
    accessorKey: "id",
    header: () => h("div", { class: "text-right font-bold text-black" }, "Toimingud"),
    size: 100,
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return h(
        "div",
        { class: "text-center font-medium flex gap-4 justify-end" },
        [
          h(EditContactButton, {
            id,
            contact: {
              name: row.getValue("name") as string,
              phoneNumber: row.getValue("phoneNumber") as string,
              codeName: row.getValue("codeName") as string,
            },
            handleUpdateContact: handleUpdate,
          }),
          h(DeleteContactButton, {
            id,
            handleDeleteContact: handleDelete,
          }),
        ]
      );
    },
  },
] as ColumnDef<Contact>[];
