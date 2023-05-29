<template>
    <div>
        <cop info="getExplorerInfo" :text="ExplorerInfo"></cop>
        <cop info="getExplorerInfo" :text="IeInfo === -1 ? '这不是IE' : '这是IE' + IeInfo"></cop>
        <cop info="isHtml5Plus" :text="html5PlusInfo ? '这是html5Plus环境' : '这不是html5Plus环境'"></cop>
        <cop info="isWxMp" :text="wxMpInfo ? '这是微信小程序' : '这不是微信小程序'"></cop>
        <cop info="isWeChat" :text="weChatInfo ? '这是微信浏览器' : '这不是微信浏览器'"></cop>
        <cop info="isMobile" :text="mobileInfo ? '这是手机' : '这不是手机'"></cop>
        <cop info="isWeCom" :text="isWeCom ? '这是企业微信' : '这不是企业微信'"></cop>
        <cop info="isAlipay" :text="isAlipay ? '这是支付宝' : '这不是支付宝'"></cop>
        <cop info="isDingTalk" :text="isDingTalk ? '这是钉钉' : '这不是钉钉'"></cop>
    </div>
</template>
<script lang="ts" setup>
import { getExplorerInfo, IEVersion } from '@niu-tools/browser/check/ie'
import { isWeCom, isAlipay, isDingTalk, isHtml5Plus, isMobile, isWeChat, isWxMp } from '@niu-tools/browser/check'
import { defineComponent, h, ref } from 'vue'

const cop = defineComponent({
    props: ['info', 'text'],
    setup(props: any, ctx) {
        return () => h('div', [
            h('code', [props.info]),
            h('span', ["检测结果：" + props.text]),
        ])
    },
})

const ExplorerInfo = getExplorerInfo()
const IeInfo = IEVersion()
const html5PlusInfo = isHtml5Plus()
const mobileInfo = isMobile()
const weChatInfo = isWeChat()
const wxMpInfo = ref<boolean>();
;(async () => {
    try {
        await isWxMp()
        wxMpInfo.value = true
    } catch (error) {
        wxMpInfo.value = false
    }
})();

</script>
<style lang="less" scoped></style>
