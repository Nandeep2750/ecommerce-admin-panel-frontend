export const CKEditorDefaultConfig = {
    toolbar: {
        items: [
            'heading',
            // '|',
            // 'fontfamily',
            // 'fontsize',
            // 'fontColor',
            // 'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'outdent',
            'indent',
            '|',
            'link',
            'blockquote',
            // 'uploadImage',
            'insertTable',
            'mediaEmbed',
            '|',
            'undo',
            'redo',
        ]
    },
    image: {
        resizeUnit: 'px',
        toolbar: [
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'toggleImageCaption',
            'imageTextAlternative',
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};