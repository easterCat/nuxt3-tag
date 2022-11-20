import { Action, ElMessage, ElMessageBox } from 'element-plus';

// 大型项目中，建议使用pinia
export const useShop = () => {
    const { $store } = useNuxtApp();
    const { copy } = useCopy();
    const key = 'shop';
    let shop = useState<string>('shop', () => '');
    let shopList = useState<any[]>('shopList', () => []);

    const initShop = () => {
        shop.value = $store.get(key) || '';
        if (!!shop.value) {
            shopList.value = shop.value.split(',').map((i) => i.trim());
        } else {
            shopList.value = [];
        }
    };

    const onlySetShop = (data: string) => {
        shop.value = data;
        $store.set(key, shop.value);
    };

    const setShop = (data: string) => {
        shop.value = data;
        shopList.value = shop.value.split(',').map((i) => i.trim());
        $store.set(key, shop.value);
        return message('初始化购物车');
    };

    const clearShop = () => {
        ElMessageBox.alert('确定清空购物车', '提示', {
            confirmButtonText: '确定',
            callback: (action: Action) => {
                if (action === 'confirm') {
                    shop.value = '';
                    shopList.value = [];
                    $store.remove(key);
                    return message('清空购物车');
                }
            },
        });
    };

    const addShop = (data: any) => {
        if (!data) {
            return warnMessage('错误数据');
        }
        if (shop.value.includes(data)) {
            return warnMessage('购物车已存在该标签');
        }
        shopList.value.push(data);
        shop.value = shopList.value.join(',');
        $store.set(key, shop.value);
        return message('添加购物车成功');
    };

    const removeShop = (index: number) => {
        shopList.value.splice(index, 1);
        shop.value = shopList.value.join(',');
        $store.set(key, shop.value);
        return message('删除成功');
    };

    const removeShopByName = (name: number) => {
        const findIndex = shopList.value.findIndex((i) => {
            return i === name;
        });
        shopList.value.splice(findIndex, 1);
        shop.value = shopList.value.join(',');
        $store.set(key, shop.value);
        return message('删除成功');
    };

    const addOneCircle = (name: any) => {
        const findIndex = shopList.value.findIndex((i) => {
            return i === name;
        });
        const newName = `(${name})`;
        shopList.value.splice(findIndex, 1, newName);
        shop.value = shopList.value.join(',');
        $store.set(key, shop.value);
    };

    const removeOneCircle = (name: any) => {
        const findIndex = shopList.value.findIndex((i) => {
            return i === name;
        });
        const newName = name.replace('(', '').replace(')', '');
        shopList.value.splice(findIndex, 1, newName);
        shop.value = shopList.value.join(',');
        $store.set(key, shop.value);
    };

    const createNewShopItem = () => {
        ElMessageBox.prompt('请输入标签内容', '提示', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        })
            .then(({ value }) => {
                shopList.value.push(value);
                shop.value = shopList.value.join(',');
                $store.set(key, shop.value);
            })
            .catch(() => {
                console.log('取消创建 :>> ');
            });
    };

    const copyShop = () => {
        copy(shop.value);
    };

    initShop();

    return {
        shop,
        shopList,
        initShop,
        setShop,
        onlySetShop,
        clearShop,
        addShop,
        removeShop,
        removeShopByName,
        copyShop,
        addOneCircle,
        removeOneCircle,
        createNewShopItem,
    };
};

function message(msg: string) {
    return ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
    });
}

function warnMessage(msg: string) {
    return ElMessage({
        showClose: true,
        message: msg,
        type: 'warning',
    });
}
