<script setup lang="ts">
import { useAsyncComponent } from '@niu-tools/vue3'
import TestComp from './test.vue'

const AsyncComponent = useAsyncComponent(TestComp)

</script>

<template>
    <div>
        <AsyncComponent></AsyncComponent>
    </div>
</template>
