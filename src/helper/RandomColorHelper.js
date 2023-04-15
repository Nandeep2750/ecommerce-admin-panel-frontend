import { randomColor } from 'randomcolor';

/* Returns a hex code for an attractive color  */
export function getAttractiveRandomColor() {
    return randomColor();
}

/* Returns a hex code for a 'truly random' color */
export function getTrulyRandomColor() {
    return randomColor({
        luminosity: 'random',
        hue: 'random'
    });
}

/* Returns a bright color in RGB */
export function getBrightColorRGB() {
    return randomColor({
        luminosity: 'bright',
        format: 'rgb' // e.g. 'rgb(225,200,20)'
    });
}

/* Returns a dark RGB color with random alpha */
export function getDarkRGBWithRandomAlpha() {
    return randomColor({
        luminosity: 'dark',
        format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
    });
}

/* Returns a dark RGB color with specified alpha */
export function getDarkRGBWithSpecifiedAlpha(alpha = 0.5) {
    return randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: alpha // e.g. 'rgba(9, 1, 107, 0.5)',
    });
}

/* Returns a light RGB color with random alpha */
export function getLightRGBWithRandomAlpha() {
    return randomColor({
        luminosity: 'light',
        format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
    });
}

/* Returns a light RGB color with specified alpha */
export function getLightRGBWithSpecifiedAlpha(alpha = 0.5) {
    return randomColor({
        luminosity: 'light',
        format: 'rgba',
        alpha: alpha // e.g. 'rgba(9, 1, 107, 0.5)',
    });
}

/* Returns a light HSL color with random alpha */
export function getlightHSLWithRandomAlpha() {
    return randomColor({
        luminosity: 'light',
        format: 'hsla' // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)'
    });
}

/* Returns a light HSL color with specified alpha */
export function getlightHSLWithSpecifiedAlpha(alpha = 0.5) {
    return randomColor({
        luminosity: 'light',
        format: 'hsla',
        alpha: alpha // e.g. 'hsla(27, 88.99%, 81.83%, 0.5)'
    });
}