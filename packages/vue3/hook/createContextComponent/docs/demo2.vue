<script setup lang="ts">
import { ThemeContext } from './ThemeContext';
</script>

<template>
    <ThemeContext.Consumer>
        <ThemeContext.Consumer #default="theme"> {{ theme }} </ThemeContext.Consumer>
    </ThemeContext.Consumer>
</template>