<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const emits = defineEmits<{
  (name: 'action:accept'): void;
  (name: 'action:reject'): void;
}>();
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child><slot></slot></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы действительно хотите это сделать?</AlertDialogTitle>
        <AlertDialogDescription>
          Это действие не обратимо! Вы должны быть абсолютно уверены
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emits('action:reject')">Отмена</AlertDialogCancel>
        <AlertDialogAction @click="emits('action:accept')">Продолжить</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
