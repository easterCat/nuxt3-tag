let throttleTimer: any = null;
let debounceTimer: any = null;

// 节流：某一高频事件不断被触发时，确保在每一个特定的时间段内被执行一次。
export const throttle = (fn: Function, delay: number): Function => {
    return (...args: any[]) => {
        if (throttleTimer) {
            return;
        }

        throttleTimer = setTimeout(() => {
            fn.apply(this, args);
            throttleTimer = null;
        }, delay);
    };
};

// 防抖：某一高频事件不断被触发时，仅在最后一次真正执行事件处理代码。
export const debounce = (fn: Function, delay: number): Function => {
    return (...args: any[]) => {
        if (debounceTimer) {
            window.clearTimeout(debounceTimer);
            debounceTimer = null;
        }

        debounceTimer = setTimeout(() => {
            fn.apply(this, args);
            debounceTimer = null;
        }, delay);
    };
};
