import { provide } from "vue";
import { FunctionalStore } from "./type";

// 可以一次传入多个hook函数， 统一管理
export function useProviders(...funcs: FunctionalStore<any>[]) {
    funcs.forEach(func => {
        !func.token && (func.token = Symbol('functional store'));
        provide(func.token, func());
    });
}