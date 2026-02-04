<script setup lang="ts">
import type { IAccount } from '@/types/Account/IAccount.ts';
import MyTip from '@/components/My/MyTip.vue';
import AccountTable from '@/components/Account/Table/AccountTable.vue';

defineProps<{
  accounts: IAccount[];
}>();

const emits = defineEmits<{
  (e: 'account:save', value: IAccount): void;
  (e: 'account:delete', value: string): void;
  (e: 'delete:all'): void;
}>();
</script>

<template>
  <div>
    <MyTip class="mb-3">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </MyTip>
    <AccountTable
      :accounts="accounts"
      @account:save="emits('account:save', $event)"
      @account:delete="emits('account:delete', $event)"
      @delete:all="emits('delete:all')"
    />
  </div>
</template>
