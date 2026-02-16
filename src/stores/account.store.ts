import { useMark } from '@/composables/useMark';
import type { IAccount } from '@/types/Account/IAccount';
import { defineStore } from 'pinia';
import { AccountTypeEnum } from '@/enums/accountType.enum.ts';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as IAccount<string[]>[],
  }),
  getters: {
    // Получаем все аккаунты, преобразуя marks из массива в строку
    getAccounts(state): IAccount[] {
      return state.accounts.map((account) => ({
        ...account,
        marks: useMark.stringify(account.marks ?? []), // тцт мы преобразуем массив меток в строку с разделителем
      }));
    },
  },
  actions: {
    // Принимает объект аккаунта и обновляет его в стейте
    updateAccount({ id, marks, ...payload }: IAccount) {
      const accountIndex = this.accounts.findIndex((account) => account.id === id);
      if (accountIndex === -1) {
        console.error(`Account with id ${id} not found.`);
        return;
      }
      const marksArray = useMark.parse(marks ?? '');

      // Если тип аккаунта изменился на LDAP, сбрасываем пароль
      if (payload.type === AccountTypeEnum.LDAP) {
        payload.password = null;
      }

      const updatedAccount: IAccount<string[]> = {
        id,
        ...payload,
        marks: marksArray,
      };
      this.accounts[accountIndex] = updatedAccount;

      return {
        ...updatedAccount,
        marks,
      };
    },

    // Создаём пустой аккаунт и добавляем его в стейт
    createAccount(): IAccount {
      const newAccount: IAccount = {
        id: crypto.randomUUID(),
        marks: '',
        type: AccountTypeEnum.LOCAL,
        login: '',
        password: '',
      };

      // Вижу что в тз написано в конец списка, но это мне показалось крайне не удобно.
      // Поэтому сделал в начале списка
      // this.accounts.push({ ...newAccount, marks: [] }); // Расскоментировать если нужно в конец списка
      this.accounts.unshift({ ...newAccount, marks: [] });
      return newAccount;
    },

    // Удаляет аккаунт по id
    deleteAccount(id: string): string | void {
      const accountIndex = this.accounts.findIndex((account) => account.id === id);
      if (accountIndex === -1) {
        console.error(`Account with id ${id} not found.`);
        return;
      }
      this.accounts.splice(accountIndex, 1);
      return id;
    },

    deleteAllAccounts() {
      this.accounts = [] as IAccount<string[]>[];

      return [];
    },
  },

  persist: true,
});
