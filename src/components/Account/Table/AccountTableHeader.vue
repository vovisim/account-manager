<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-vue-next';
import DeleteDialog from '@/components/My/Dialog/DeleteDialog.vue';

const emits = defineEmits<{
  (name: 'delete:all'): void;
}>();
</script>

<template>
  <div
    class="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 text-sm font-semibold text-gray-500 border-b border-gray-300"
  >
    <div>Метки</div>
    <div>Тип записи</div>
    <div>Логин</div>
    <div>Пароль</div>
    <DeleteDialog @action:accept="emits('delete:all')">
      <Button class="w-fit" variant="outline">
        <Trash />
      </Button>
    </DeleteDialog>
  </div>
</template>
