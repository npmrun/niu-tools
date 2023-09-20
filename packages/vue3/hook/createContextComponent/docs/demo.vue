<script setup lang="ts">
import { ref } from 'vue';
import { ThemeContext } from './ThemeContext';
import Page from './demo2.vue';

const theme = ref('light');
</script>

<template>
  <ThemeContext.Provider :value="theme">
    <Page></Page>
  </ThemeContext.Provider>
</template>
