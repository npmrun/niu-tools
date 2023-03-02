import type { platformRule } from "@/types"

export function whichPlatform(): platformRule {
    const env: platformRule = process.env.VUE_APP_PLATFORM as platformRule
    return env
}

export function isExist(value: any) {
    return value !== undefined
}
