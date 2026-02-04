<script setup lang="ts">
import { computed } from 'vue';
import { Field as VeeField, Form, useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { IAccount } from '@/types/Account/IAccount';
import { AccountTypeEnum, AccountTypeEnumLabel } from '@/enums/accountType.enum';
import { Trash } from 'lucide-vue-next';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import debounce from 'lodash/debounce';
import { FieldError } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/My/Dialog/DeleteDialog.vue';

const emits = defineEmits<{
  (e: 'account:save', value: IAccount): void;
  (e: 'account:delete', value: string): void;
}>();

const { account } = defineProps<{
  account: IAccount;
}>();

const isLocal = computed(() => account.type === AccountTypeEnum.LOCAL);

// Схема валидации формы
const schema = computed(() =>
  toTypedSchema(
    z.object({
      marks: z
        .string()
        .min(1, 'Поле не может быть пустым')
        .max(50, 'Поле не может быть более 50 символов'),
      type: z.nativeEnum(AccountTypeEnum),
      login: z
        .string()
        .min(1, 'Поле не может быть пустым')
        .max(100, 'Поле не может быть больше 100 символов'),
      password: isLocal.value
        ? z
            .string({ message: 'Минимум 6 символов' })
            .min(6, 'Минимум 6 символов')
            .max(100, 'Поле не может быть более 100 символов')
        : z.string().nullable().optional(),
    })
  )
);

useForm({
  initialValues: account,
  validationSchema: schema,
});

// Поставил тут дебаунс, чтобы не вызывать слишком часто событие сохранения при вводе данных
const debouncedValidateSubmit = debounce(async (values, validate) => {
  const valid = await validate();
  if (!valid.valid) return;

  emits('account:save', { ...account, ...values });
}, 500);
</script>

<template>
  <Form
    :initial-values="account"
    :validation-schema="schema"
    class="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 items-top text-sm transition"
    v-slot="{ values, validate }"
  >
    <VeeField v-slot="{ field, errors }" name="marks">
      <Field orientation="responsive" :data-invalid="!!errors.length">
        <Input
          v-bind="field"
          placeholder="Значение"
          @input="debouncedValidateSubmit(values, validate)"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="type">
      <Field orientation="responsive" :data-invalid="!!errors.length">
        <Select
          :name="field.name"
          :model-value="field.value"
          @update:model-value="
            (val) => {
              field.onChange(val);
              emits('account:save', { ...account, ...values });
            }
          "
        >
          <SelectTrigger class="w-full" id="type-select" :aria-invalid="!!errors.length">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in Object.values(AccountTypeEnum)" :key="item" :value="item">
                {{ AccountTypeEnumLabel[item] }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="login">
      <Field
        orientation="responsive"
        :data-invalid="!!errors.length"
        :class="{ 'col-span-2': !isLocal }"
      >
        <Input
          v-bind="field"
          placeholder="Значение"
          @input="debouncedValidateSubmit(values, validate)"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <div v-if="isLocal">
      <VeeField v-slot="{ field, errors }" name="password">
        <Field orientation="responsive" :data-invalid="!!errors.length">
          <Input
            v-bind="field"
            type="password"
            placeholder="Значение"
            @input="debouncedValidateSubmit(values, validate)"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </div>
    <DeleteDialog @action:accept="emits('account:delete', account.id)">
      <Button class="w-fit" variant="outline"><Trash /></Button>
    </DeleteDialog>
  </Form>
</template>
