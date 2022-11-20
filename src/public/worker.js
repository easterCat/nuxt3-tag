self.addEventListener(
    'message',
    function (e) {
        const { type, data } = e.data;
        if (type === 'all') {
            let allData = data;
            let totalList = [];
            allData.forEach((d) => {
                const { data } = d;
                for (const [key, value] of Object.entries(data)) {
                    const obj = {
                        namespace: d.namespace,
                        key,
                        value,
                    };
                    totalList.push(obj);
                }
            });
            self.postMessage({
                type,
                data: totalList,
            });
        } else if (type === 'select') {
            const allEhttData = data;
            const selectList = allEhttData.filter((i) => {
                return i.namespace === e.data.select;
            });
            self.postMessage({
                type,
                data: selectList,
            });
        } else if (type === 'search') {
            const allNeedSearchData = data;
            const searchList = allNeedSearchData.filter((i) => {
                return i.key.includes(e.data.search);
            });
            self.postMessage({
                type,
                data: searchList,
            });
        } else {
            self.postMessage('Type is null');
        }
    },
    false,
);
