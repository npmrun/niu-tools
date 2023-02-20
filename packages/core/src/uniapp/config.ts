interface IConfing {
    navbarDefaultHeight: number
}
export const config: IConfing = {
    navbarDefaultHeight: 80, // 默认标题栏高度
}

/**
 * 设置全局配置
 * @param opts 配置选项
 */
export function setConfig(opts: Partial<IConfing>) {
    ;(Object.keys(opts) as (keyof IConfing)[]).forEach(key => {
        if (config[key] !== undefined && opts[key] !== undefined) {
            config[key] = opts[key]!
        }
    })
}
