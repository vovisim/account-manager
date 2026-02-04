<script setup lang="ts">
import AccountComponent from '@/components/Account/AccountComponent.vue';
import { useColorMode } from '@vueuse/core';

useColorMode().value = 'dark';
</script>

<template>
  <div class="container m-7">
    <AccountComponent />
  </div>
</template>
