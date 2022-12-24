import { animateNow } from './event';

export default (el: any, value: any, modifiers: any) => {
    const { click, hover } = modifiers;

    if (typeof value === 'string') {
        value = { classes: value };
    }

    if (click) {
        el.onclick = () => {
            animateNow(el, value, modifiers);
        };
        return;
    }

    if (hover) {
        el.onmouseover = () => {
            animateNow(el, value, modifiers);
        };
        return;
    }

    animateNow(el, value, modifiers);
};
