<script setup lang="ts">
const props = defineProps<{
  columns: ColumnDef<Contact>[];
  data: Contact[];
  loadingStatus: "loading" | "failed" | "finished";
}>();
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/vue-table";
import { computed, ref } from "vue";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { valueUpdater } from "../../lib/utils";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { Contact } from "../../lib/types";
import Button from "../ui/button/Button.vue";

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const searchText = ref("");
const filteredData = computed(() => {
  if (searchText.value.trim() === "") {
    return props.data;
  }
  const text = searchText.value.toLowerCase();
  return props.data.filter(
    (c) =>
      c.name.toLowerCase().includes(text) ||
      c.phoneNumber.toLowerCase().includes(text) ||
      c.codeName.toLowerCase().includes(text)
  );
});

const table = useVueTable<Contact>({
  get data() {
    return filteredData;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
});

const reload = () => {
  window.location.reload();
};
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm bg-white/40 outline-none transition focus:bg-white/80 : hover:bg-white/60 placeholder:text-black/70"
        placeholder="Otsi kontakte..."
        v-model="searchText"
      />
    </div>

    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="loadingStatus === 'finished'">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Kontaktid puuduvad. Vajuta nuppu "Lisa kontakt", et lisada uus
                kontakt.
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="loadingStatus === 'failed'">
            <TableRow class="text-center w-full">
              <TableCell :colspan="columns.length" class="h-24 text-center">
                <p class="pb-2">Ühenduse loomine serveriga ebaõnnestus.</p>
                <Button @click="reload">Proovi uuesti</Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="loadingStatus === 'loading'">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Andmebaasiga ühenduse loomine.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
