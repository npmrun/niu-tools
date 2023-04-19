
//对原生inject进行封装

import { inject } from "vue";
import { FunctionalStore } from "./type";

type InjectType = 'root' | 'optional';

//接收第二个参数，'root'表示直接全局使用；optional表示可选注入，防止父组件的provide并未传入相关hook
export function useInjector<T extends object>(func: FunctionalStore<T>, type?: InjectType) {
    const token = func.token!;
    const root = func.root;

    switch (type) {
        case 'optional':
            return (inject<T>(token) || func.root || null) as T;
        case 'root':
            if (!func.root) func.root = func();
            return func.root as T;
        default:
            const data = inject<T>(token)
            if (data) {
                return data as T;
            };
            if (root) return func.root as T;
            throw new Error(`状态钩子函数${func.name}未在上层组件通过调用useProvider提供`);
    }
}