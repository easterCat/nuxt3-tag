import { debounce } from '../index';

let scrollToAnimationFuncPools: any[] = [];
const targetHeightArr: any[] = [];

function scrollToSmoothly(targetPos: any, contaienr: any, time: any, mode: any, cb: any) {
    // 優化避免重複執行
    scrollToAnimationFuncPools.forEach((id) => window.cancelAnimationFrame(id));
    scrollToAnimationFuncPools = [];

    const currentPos = contaienr.scrollTop;
    if (currentPos === targetPos) return;
    let startTime: number | null = null;

    if (mode !== 'smooth') {
        contaienr.scrollTo({
            top: targetPos,
        });
        return;
    }

    // 平滑功能使用此函式
    const animationId = window.requestAnimationFrame(function step(currentTime) {
        startTime = !startTime ? currentTime : startTime;

        const progress = currentTime - startTime;
        const movePos = Math.abs(((targetPos - currentPos) * progress) / time);

        if (currentPos < targetPos) {
            contaienr.scrollTo(0, currentPos + movePos);
        } else {
            contaienr.scrollTo(0, currentPos - movePos);
        }

        if (progress < time) {
            const animationId = window.requestAnimationFrame(step);
            scrollToAnimationFuncPools.push(animationId);
        } else {
            contaienr.scrollTo(0, targetPos);
            if (cb) cb();
        }
    });
    scrollToAnimationFuncPools.push(animationId);
}

export default {
    install(app: any) {
        app.directive('scroll-to', {
            mounted(el: any, binding: any) {
                const target = document.querySelector(binding.value.target) || null;
                const targetH = target.offsetTop || 0;
                targetHeightArr.push(targetH);
                const contaienr = document.querySelector(binding.value.container) || window;
                const containerH = contaienr.offsetTop || 0;
                // 平滑功能
                const mode = binding.value.behavior || '';
                // 滑動總時間
                const time = binding.value.time || 500;
                const cb = binding.value.cb || null;
                const asyncCb = binding.value.syncCb || null;

                el.addEventListener('click', () => {
                    scrollToSmoothly(targetH - containerH, contaienr, time, mode, asyncCb);
                    if (cb) cb();
                });

                contaienr.addEventListener(
                    'scroll',
                    debounce((e: any) => {
                        const top = e.target.scrollTop;
                        const findIndex = targetHeightArr.findIndex((item, index) => {
                            const prev = targetHeightArr[index - 1]
                                ? targetHeightArr[index - 1]
                                : 0;
                            const now = item;
                            return top <= now && top >= prev;
                        });
                        console.log('findIndex :>> ', findIndex);
                        if ((findIndex || findIndex === 0) && cb) cb(findIndex);
                    }, 1500),
                );
            },
        });
    },
};
