// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const highlightOpen = (event) => {
    let file = event.target.files[0];
    let r = new FileReader();
    r.readAsText(file);
    r.onload = function () {
        console.log(file);
        // document.getElementById('highlightCode').innerText = r.result;

        // hljs.highlightAll();

        const highlighted = hljs.highlightAuto(r.result);
        // console.log(highlighted);

        const detectedLanguage = highlighted.language;
        const highlightedCode = highlighted.value;
        // console.log(highlightedCode);

        document.getElementById('highlightFilename').value = file.name;
        document.getElementById('highlightType').value = file.type;
        document.getElementById('highlightLanguage').value = detectedLanguage;
        document.getElementById('highlightCode').innerHTML = highlightedCode;

        event.target.value = ''
    };
};

const highlightSave = _ => {
    const content = document.getElementById('highlightCode').innerText;
    if (content !== '') {
        const blob = new Blob([content], { type: document.getElementById('highlightType').value });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = document.getElementById('highlightFilename').value;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
};

window.addEventListener('DOMContentLoaded', _ => {
    document.getElementById('highlightOpen').addEventListener('change', (event) => highlightOpen(event));
    document.getElementById('highlightOpen').addEventListener('click', (event) => event.target.value = '');
    document.getElementById('highlightSave').addEventListener('click', () => highlightSave());
});
