<template>
    <div style="display: flex; align-items: center">

        <div style="width: 0;flex: 1;">
            <textarea style="display: block;width: 100%;height: 200px;border: 1px solid #eee;" v-model="sourceObject"></textarea>
        </div>
        <span style="padding: 0 20px">==></span>
        <textarea style="width: 0;flex: 1; height: 200px;border: 1px solid #eee;" readonly
            v-model="targetObject"></textarea>
    </div>
</template>

<script setup lang="ts">
import { slash } from '@niu-tools/core/path'
import { ref, computed } from 'vue'

const sourceObject = ref("D:\\\\a\\b\\c\\d\\e")

const targetObject = computed(() => slash(sourceObject.value))
</script>
