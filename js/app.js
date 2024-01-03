// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const highlightOpen = (event) => {
    let file = event.target.files[0];
    let r = new FileReader();
    r.readAsText(file);
    r.onload = function () {
        // console.log(file);
        const highlightLanguage = document.getElementById('highlightLanguageSelector').value;

        let highlighted, detectedLanguage = '';
        if (highlightLanguage == 'autoDetect') {
            highlighted = hljs.highlightAuto(r.result);
            detectedLanguage = highlighted.language;
        } else {
            highlighted = hljs.highlight(r.result, { language: highlightLanguage });
            detectedLanguage = highlightLanguage;
        }
        const highlightedCode = highlighted.value.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\r?\n/g, '<br>');

        document.getElementById('highlightFilename').value = file.name;
        document.getElementById('highlightType').value = file.type;
        document.getElementById('highlightLanguage').value = detectedLanguage;
        document.getElementById('highlightCode').innerHTML = highlightedCode;

        document.getElementById('highlightSave').removeAttribute('disabled');

        event.target.value = ''
    };
};

const highlightSave = _ => {
    const content = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">\n' + document.getElementById('highlightCode').innerHTML;
    if (content !== '') {
        const blob = new Blob([content], { type: document.getElementById('highlightType').value });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = document.getElementById('highlightFilename').value + '.html';
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
};

const initializeLanguageSelection = () => {
    let select = document.getElementById("highlightLanguageSelector");
    let languages = hljs.listLanguages();

    languages.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        option.value = element;
        select.appendChild(option);
    });
}

window.addEventListener('DOMContentLoaded', _ => {
    document.getElementById('highlightOpen').addEventListener('change', (event) => highlightOpen(event));
    document.getElementById('highlightOpen').addEventListener('click', (event) => event.target.value = '');
    document.getElementById('highlightSave').addEventListener('click', () => highlightSave());

    initializeLanguageSelection();
});
