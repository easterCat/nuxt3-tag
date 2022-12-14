import { copyText } from 'vue3-clipboard';

export const useCopy = () => {
    const copy = (data: any) => {
        const copyData = data ? data.trim() : '';
        copyText(copyData, undefined, (error: any) => {
            if (error) {
                console.log(error);
            } else {
                return ElMessage({
                    showClose: true,
                    message: 'ε€εΆζε',
                    type: 'success',
                });
            }
        });
    };

    return { copy };
};
