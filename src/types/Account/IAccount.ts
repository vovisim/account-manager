import type { AccountTypeEnum } from '@/enums/accountType.enum.ts';

export interface IAccount<K extends string | string[] = string> {
  id: AccountId;
  marks: K;
  type: AccountTypeEnum;
  login: string;
  password: AccountValueMap[AccountTypeEnum];
}
