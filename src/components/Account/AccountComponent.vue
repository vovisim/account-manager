<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAccountStore } from '@/stores/account.store.ts';
import type { IAccount } from '@/types/Account/IAccount.ts';
import { onMounted, ref } from 'vue';
import AccountForm from '@/components/Account/AccountForm.vue';

const accountStore = useAccountStore();

const accounts = ref<IAccount[]>([]);

const createAccount = () => {
  const account: IAccount = accountStore.createAccount();
  // Вижу что в тз написано в конец списка, но это мне показалось крайне не удобно.
  // Поэтому сделал в начале списка
  // this.accounts.push({ ...newAccount, marks: [] }); // Расскоментировать если нужно в конец списка
  accounts.value.unshift(account);
};

const updateAccount = (account: IAccount) => {
  const updatedAccount = accountStore.updateAccount(account);

  if (!updatedAccount) return;

  const index = accounts.value.findIndex((elem) => elem.id === account.id);
  accounts.value[index] = updatedAccount;
};

const deleteAccount = (id: string) => {
  const deletedAccount = accountStore.deleteAccount(id);

  if (!deletedAccount) return;

  accounts.value = accounts.value.filter((elem) => elem.id !== deletedAccount);
};

const deleteAccounts = () => {
  // Сделал так, потому что в дальнейшем может надо будет возращать аккаунты по умолчанию или ещё что то
  const deletedAccounts = accountStore.deleteAllAccounts();

  accounts.value = deletedAccounts;
};

onMounted(() => {
  accounts.value = accountStore.getAccounts;
});
</script>
<template>
  <div>
    <div class="flex gap-5 items-center mb-5">
      <div class="text-xl">Учетные записи</div>
      <Button class="text-xl" variant="outline" @click="createAccount">+</Button>
    </div>
    <AccountForm
      :accounts="accounts"
      @account:save="updateAccount($event)"
      @account:delete="deleteAccount($event)"
      @delete:all="deleteAccounts"
    />
  </div>
</template>
