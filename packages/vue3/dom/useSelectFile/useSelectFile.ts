import { ref } from 'vue';

import { FileSelectCancelError, IllegalFileError, selectFile } from '../vc-utils';

export const useSelectFile = () => {
  const loading = ref<boolean>(false);

  const error = ref<FileSelectCancelError | IllegalFileError>();

  /**
    * 执行选择文件
    * @param accepts 选择文件的类型
    * @returns 是否选择多个
    */
  const execute = async (accepts: string[] = ['*'], multiple: boolean = false): Promise<File[]> => {
    try {
      loading.value = true;
      const files = await selectFile(accepts, multiple);
      return files;
    } catch (e) {
      if (e instanceof FileSelectCancelError || e instanceof IllegalFileError) {
        error.value = e;
      }
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    execute,
  };
};
