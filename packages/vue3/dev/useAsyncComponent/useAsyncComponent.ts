import { Component, defineAsyncComponent, defineComponent, h } from "vue"

function loadingComponent() {
    return h("div", {
        style: {
            textAlign: "center",
            paddingTop: "20px"
        }
    },
        ["加载中..."]);
}

const emptyComponent = defineComponent({
    name: 'EmptyComponent',
    render() {
        return h("div", null, "空")
    }
})

const componentLoader = (comp: Component) => () =>
    new Promise<any>(async resolve => {
        const [compont] = await Promise.all([
            comp,
            new Promise(re => {
                setTimeout(async () => {
                    re(0)
                }, 2000)
            }),
        ])
        resolve(compont)
    })

export function useAsyncComponent(comp: Component) {
    return defineAsyncComponent({
        loader: componentLoader(comp),
        loadingComponent: loadingComponent,
    })
}
