<template>
    <div style="display: flex; align-items: center">
        <textarea style="width: 220px; height: 200px;border: 1px solid #eee;" :value="jsonStr(sourceObject)"></textarea>
        <span style="padding: 0 20px">==></span>
        <textarea style="width: 220px; height: 200px;border: 1px solid #eee;" :value="jsonStr(targetObject)"></textarea>
    </div>
</template>

<script setup lang="ts">
import dotize from '@niu-tools/core/dotize'

const sourceObject = {
    status: 'success',
    auth: {
        code: 123,
        name: 'qwerty asdfgh',
    },
}

function jsonStr(obj: object) {
    return JSON.stringify(obj, null, 2)
}

const targetObject = dotize.convert(sourceObject)
</script>
