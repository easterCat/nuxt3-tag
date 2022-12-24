import animates from './animates.json';

export const animateNow = (el: any, value: any, modifiers: any) => {
    const { direction, delay, timing, duration, iteration } = value;
    const values = ['animate__animated'];

    if (direction) {
        values.push(`animate__${direction}`);
    } else {
        values.push('animate__fadeIn');
    }

    if (duration) {
        el.style['animation-duration'] = `${duration}ms`;
    } else {
        el.style['animation-duration'] = `500ms`;
    }

    if (delay) {
        el.style['animation-delay'] = `${delay}ms`;
    } else {
        el.style['animation-delay'] = `0ms`;
    }

    if (iteration) {
        el.style['animation-iteration-count'] = `${timing}`;
    } else {
        el.style['animation-iteration-count'] = `1`;
    }

    if (timing) {
        el.style['animation-timing-function'] = `${timing}`;
    } else {
        el.style['animation-timing-function'] = `linear`;
    }

    const classNames = `${el.classList.value} ${values.join(' ')}`;

    el.className = classNames;
    el.setAttribute('animate-data', classNames);
};

export const animationEnd = (el: any, value: any, modifiers: any) => {
    if (modifiers.once) return;
    el.addEventListener(
        'animationend',
        () => {
            const classes = el.classList;
            animates.forEach((item: string) => {
                if (classes.contains(item)) {
                    el.classList.remove(item);
                }
            });
        },
        false,
    );
};
