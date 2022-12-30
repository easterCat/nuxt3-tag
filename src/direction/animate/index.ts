import animate from './animate';
import './animate.css';

interface Methods {
    install: (app: any, options?: { animateCSSPat?: string }) => void;
}

// https://github.com/OSSPhilippines/v-animate-css
// https://animate.style/
const VueAnimateCss: Methods = {
    install: (app: any, options: any) => {
        // const animateCSSPath = options?.animateCSSPath || '';
        // const link = document.createElement('link');
        // link.rel = 'stylesheet';
        // link.href =
        //     animateCSSPath ||
        //     'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
        // document.getElementsByTagName('head')[0].appendChild(link);

        app.directive('animate-css', {
            mounted(el: any, binding: any) {
                const { value, modifiers } = binding;
                animate(el, value, modifiers);
            },
        });
    },
};

export default VueAnimateCss;
