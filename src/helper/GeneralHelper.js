/* This file is use for create General helper functions */

export function generateRandomFileName(prefix) {
    const timestamp = Date.now() + Math.floor(Math.random() * 100);
    if (prefix) {
        return 'CMS_' + prefix + '_' + timestamp;
    } else {
        return 'CMS_' + timestamp;
    }
}

export function getPlaceholderImage(width = 100, height= 100,text="placeholderimage") {
    return `https://placehold.jp/${width}x${height}.png?text=${text}`
}
