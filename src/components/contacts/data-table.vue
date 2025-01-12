<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/vue-table";
import { h, ref, watch } from "vue";
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
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { Contact } from "../../lib/validations";

const props = defineProps<{
  columns: ColumnDef<Contact, TValue>[];
  data: Contact[];
  setFilteredData: (data: Contact[]) => void;
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const seachText = ref('123')
const filtreredData = ref(props.data)

const table = useVueTable<Contact>({
  get data() {
    return filtreredData;
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
watch(seachText, (newSearchText) => {
  const text = newSearchText.toLowerCase();
  filtreredData.value = props.data.filter(c => c.name.toLowerCase().includes(text) || c.phoneNumber.toLowerCase().includes(text) || c.codeName.toLowerCase().includes(text))
});
const test = (newSearchText: string) => {
  seachText.value = newSearchText; // Manually update seachText when the input changes
};
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm bg-white/40 outline-none transition focus:bg-white/80 : hover:bg-white/60 placeholder:text-black/70"
        placeholder="Otsi kontakte..."
        v-model="seachText"
      />
        <!-- :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)" -->
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
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                Kontaktid puuduvad. Vajuta nuppu "Lisa Kontakt", et lisada uus
                kontakt.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
