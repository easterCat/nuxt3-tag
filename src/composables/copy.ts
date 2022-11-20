import { copyText } from 'vue3-clipboard';
import { ElMessage } from 'element-plus';

export const useCopy = () => {
    const copy = (data: any) => {
        copyText(data, undefined, (error: any, event: any) => {
            if (error) {
                console.log(error);
            } else {
                return ElMessage({
                    showClose: true,
                    message: '复制成功',
                    type: 'success',
                });
            }
        });
    };

    return { copy };
};
