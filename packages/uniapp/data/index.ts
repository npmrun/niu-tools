import { whichPlatform } from "@/util"
import { config } from "@/config"

/**
 * 获取状态栏的高度
 * @param px 是否携带px单位
 * @returns 状态栏的高度
 */
export function getStatusBarHeight(): number
export function getStatusBarHeight(px: false): number
export function getStatusBarHeight(px: true): string
export function getStatusBarHeight(px?: boolean): string | number {
    let height = uni.getSystemInfoSync().statusBarHeight || 0
    return px ? `${height}px` : height
}

/**
 * 只获取标题栏高度
 */
export function getTitleHeight(): number
export function getTitleHeight(px: false): number
export function getTitleHeight(px: true): number
export function getTitleHeight(navbarHeight: number): number
export function getTitleHeight(navbarHeight: number, px: false): number
export function getTitleHeight(navbarHeight: number, px: true): string
export function getTitleHeight(heightOrPx?: number | boolean, isPx?: boolean): number | string {
    let navbarHeight: number = config.navbarDefaultHeight
    let px: boolean = false
    if (typeof heightOrPx === "boolean") {
        px = !!heightOrPx
    }
    if (typeof heightOrPx === "number") {
        navbarHeight = heightOrPx
        px = !!isPx
    }
    let height = uni.upx2px(navbarHeight)
    let statusBarHeight = getStatusBarHeight()
    if (whichPlatform() === "mp-weixin") {
        let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        let menutop = menuButtonInfo.top || 0
        let menuHeight = menuButtonInfo.height || 0
        console.log(menuButtonInfo)

        height = (menutop - statusBarHeight) * 2 + menuHeight
    }
    return px ? `${height}px` : height
}

/**
 * 获取标题栏总高度
 */
export function getNavbarHeight(): number
export function getNavbarHeight(px: false): number
export function getNavbarHeight(px: true): number
export function getNavbarHeight(navbarHeight: number): number
export function getNavbarHeight(navbarHeight: number, px: false): number
export function getNavbarHeight(navbarHeight: number, px: true): string
export function getNavbarHeight(heightOrPx?: number | boolean, isPx?: boolean): number | string {
    let navbarHeight: number = config.navbarDefaultHeight
    let px: boolean = false
    if (typeof heightOrPx === "boolean") {
        px = !!heightOrPx
    }
    if (typeof heightOrPx === "number") {
        navbarHeight = heightOrPx
        px = !!isPx
    }
    let height = uni.upx2px(navbarHeight)
    let statusBarHeight = getStatusBarHeight()
    if (whichPlatform() === "mp-weixin") {
        let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        let menutop = menuButtonInfo.top || 0
        let menuHeight = menuButtonInfo.height || 0
        height = (menutop - statusBarHeight) * 2 + menuHeight
        height = height + statusBarHeight
    } else if (whichPlatform() === "app-plus") {
        height = height + statusBarHeight
    }
    return px ? `${height}px` : height
}
