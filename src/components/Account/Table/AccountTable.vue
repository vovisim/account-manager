<script setup lang="ts">
import AccountTableHeader from '@/components/Account/Table/AccountTableHeader.vue';
import AccountTableRow from '@/components/Account/Table/AccountTableRow.vue';
import type { IAccount } from '@/types/Account/IAccount.ts';

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
  <div class="w-full overflow-x-auto">
    <div>
      <AccountTableHeader @delete:all="emits('delete:all')" />

      <div class="divide-y divide-gray-200">
        <AccountTableRow
          v-for="account in accounts"
          :key="account.id"
          :account="account"
          @account:save="emits('account:save', $event)"
          @account:delete="emits('account:delete', $event)"
        />
      </div>
    </div>
  </div>
</template>
