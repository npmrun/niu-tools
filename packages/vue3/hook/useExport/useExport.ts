import { ref } from 'vue';

import { MimeType } from './mime-type';

class ExportError extends Error {
    constructor(fileName: string, e: any) {
        super(`${fileName} 导出失败`, { cause: e.cause });
    }
}

export type FileName<T> = string | ((data?: T) => string);

export const useExport = <T = Record<string | number | symbol, any>>(
    requestFunc: (data?: T) => string | Promise<string>,
    fileName: FileName<T> = 'file',
    mimeType: MimeType = MimeType.TEXT,
    charset: string = 'utf-8',
    isURL: boolean = false
) => {
    const loading = ref<boolean>(false);

    const error = ref<ExportError>();

    const execute = async (data?: T): Promise<void> => {
        loading.value = true;
        if (typeof fileName === 'function') {
            fileName = fileName(data);
        }
        try {
            const res = await Promise.resolve(requestFunc(data));
            const link = document.createElement('a');
            if (isURL) {
                link.href = res;
            } else {
                const blob = new Blob([res], { type: `${mimeType};charset=${charset}` });
                link.href = window.URL.createObjectURL(blob);
            }
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
        } catch (e) {
            error.value = new ExportError(fileName, e);
            throw error.value;
        } finally {
            loading.value = false;
        }
    };

    return {
        execute,
        loading,
        error,
        compatDownload: download
    };
};

function download(blob: Blob, fileName: string = "") {
    if (URL && URL.createObjectURL) {
        const url = URL.createObjectURL(blob)
        var a = document.createElement("a")
        a.setAttribute("download", fileName)
        a!.href = url
        document.body.append(a) // 修复firefox中无法触发click
        a.click()
        setTimeout(() => URL.revokeObjectURL(a.href))
        a.remove()
    } else {
        var reader = new FileReader()
        reader.readAsDataURL(blob) // 转换为base64，可以直接放入a中的href
        reader.onload = function (e) {
            // 转换完成，创建一个a标签用于下载
            var a = document.createElement("a")
            a.setAttribute("download", fileName)
            a!.href = e.target!.result as string
            document.body.append(a) // 修复firefox中无法触发click
            a.click()
            a.remove()
        }
    }
}