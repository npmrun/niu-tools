<template>
    <div style="display: flex; align-items: center">
        <a-textarea
            style="width: 220px; height: 200px"
            :modelValue="jsonStr(sourceObject)"
        ></a-textarea>
        <span style="padding: 0 20px">==></span>
        <a-textarea
            style="width: 220px; height: 200px"
            :modelValue="jsonStr(targetObject)"
        ></a-textarea>
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

const targetObject = dotize.convert({
    status: 'success',
    auth: {
        code: 123,
        name: 'qwerty asdfgh',
    },
})
</script>
