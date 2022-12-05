import { Action, ElMessageBox } from 'element-plus';

// 大型项目中，建议使用pinia
export const useShop = () => {
    const { $store } = useNuxtApp();
    const { copy } = useCopy();
    const key = 'shop';
    const shop = useState<string>('shop', () => '');
    const shopList = useState<any[]>('shopList', () => []);

    const initShop = () => {
        shop.value = $store.get(key) || '';
        if (shop.value) {
            _shopToList();
        } else {
            shopList.value = [];
        }
    };

    const onlySetShop = (data: string) => {
        shop.value = data;
        _setStore();
    };

    const setShop = (data: string) => {
        shop.value = data;
        _shopToList();
        _setStore();
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
        shopList.value.push({ text: data });
        _listToShop();
        _setStore();
        return message('添加购物车成功');
    };

    const removeShop = (index: number) => {
        shopList.value.splice(index, 1);
        _listToShop();
        _setStore();
        return message('删除成功');
    };

    const removeShopByName = (name: number) => {
        const findIndex = shopList.value.findIndex((i: any) => {
            return i.text === name;
        });
        shopList.value.splice(findIndex, 1);
        _listToShop();
        _setStore();
        return message('删除成功');
    };

    const renameShopName = (name: number) => {
        ElMessageBox.prompt('请输入新内容', '修改', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        })
            .then(({ value }) => {
                const findIndex = shopList.value.findIndex((i: any) => {
                    return i.text === name;
                });
                shopList.value[findIndex].text = value;
                _listToShop();
                _setStore();
            })
            .catch(() => {
                console.log('取消创建 :>> ');
            });
    };

    const addOneCircle = (name: any) => {
        const findIndex = shopList.value.findIndex((i: any) => {
            return i.text === name;
        });
        const newName = `(${name})`;
        shopList.value.splice(findIndex, 1, newName);
        _listToShop();
        _setStore();
    };

    const removeOneCircle = (name: any) => {
        const findIndex = shopList.value.findIndex((i: any) => {
            return i.text === name;
        });
        const newName = name.replace('(', '').replace(')', '');
        shopList.value.splice(findIndex, 1, newName);
        _listToShop();
        _setStore();
    };

    const createNewShopItem = () => {
        ElMessageBox.prompt('请输入标签内容', '提示', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        })
            .then(({ value }) => {
                shopList.value.push({ text: value });
                _listToShop();
                _setStore();
            })
            .catch(() => {
                console.log('取消创建 :>> ');
            });
    };

    const copyShop = () => {
        copy(shop.value);
    };

    function _setStore() {
        $store.set(key, shop.value);
    }

    function _listToShop() {
        shop.value = shopList.value.map((i: any) => i.text).join(',');
    }

    function _shopToList() {
        shopList.value = shop.value.split(',').map((i: string) => {
            return { text: i.trim() };
        });
    }

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
        renameShopName,
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
