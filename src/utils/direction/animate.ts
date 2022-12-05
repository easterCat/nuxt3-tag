import './animate.css';

interface Methods {
    install?: (app: any) => void;
}

const VueAnimateCss: Methods = {};

VueAnimateCss.install = function (app: any) {
    // direction => animate.css type
    // delay => animate,css delay time
    app.directive('animate', {
        mounted(el: any, binding: any) {
            const { value } = binding;
            const { direction, delay, timing } = value;

            const values = ['animate__animated', 'linear'];

            if (direction) {
                values.push(`animate__${direction}`);
            } else {
                values.push('animate__fadeIn');
            }

            if (delay) {
                values.push(`animate__delay-${delay}s`);
            }

            if (timing) {
                values.push(`animate__${timing}`);
            } else {
                values.push('animate__linear');
            }

            el.addEventListener(
                'animationend',
                function () {
                    const classes = el.classList;
                    classes.forEach((item: string | string[]) => {
                        if (item.includes('animate')) {
                            // remove animate class after anime
                            el.classList.remove(item);
                        }
                    });
                },
                false,
            );

            el.className = `${el.classList.value} ${values.join(' ')}`;
            el.setAttribute('animate-data', values.join(' '));
        },
    });
};

export default VueAnimateCss;
