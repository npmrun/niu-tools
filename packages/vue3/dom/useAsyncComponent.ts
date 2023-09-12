import { AsyncComponentLoader, defineAsyncComponent, h, markRaw } from "vue"

function loadingComponent() {
    return h("div", {
        style: {
            textAlign: "center",
            paddingTop: "20px",
            fontSize: "2em"
        }
    },
        () => "加载中");
}

export function useAsyncComponent(comp: AsyncComponentLoader<any>) {
    return markRaw(
        defineAsyncComponent({
            loader: markRaw(
                comp,
                // () =>
                //     new Promise<any>(async resolve => {
                //         const [compont] = await Promise.all([
                //             comp(),
                //             new Promise(re => {
                //                 setTimeout(async () => {
                //                     re(0)
                //                 }, 2000)
                //             }),
                //         ])
                //         resolve(compont)
                //     }),
            ),
            loadingComponent: markRaw(loadingComponent),
        }) as any,
    )
}
