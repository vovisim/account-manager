<script setup lang="ts">
import { CircleQuestionMark } from 'lucide-vue-next';

</script>

<template>
  <div class="flex gap-3 items-center border bg-gray-500 p-4 rounded-xl">
    <CircleQuestionMark />
    <slot></slot>
  </div>
</template>
