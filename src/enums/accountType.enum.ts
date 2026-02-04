export enum AccountTypeEnum {
  'LDAP' = 'LDAP',
  'LOCAL' = 'LOCAL',
}
export const AccountTypeEnumLabel: Record<AccountTypeEnum, string> = {
  [AccountTypeEnum.LOCAL]: 'Локально',
  [AccountTypeEnum.LDAP]: 'LDAP',
};
