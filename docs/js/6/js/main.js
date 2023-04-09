window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const MARKDOWN = document.getElementById('markdown')
    const HTML = document.getElementById('html')
    const PREVIEW = document.getElementById('preview')
    const res = await fetch(`md/test.md`)
    const src = await res.text()
    MARKDOWN.value = src
    //marked.setOptions({async:true, gfm:true, breaks:true})
    marked.setOptions({async:true, gfm:true, breaks:true,
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            if (!langs.has(language)) {
                console.log(language, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                const script = document.createElement('script')
                script.setAttribute('src', `lib/highlight/11.7.0/langs/${language}.min.js`)
                document.body.append(script)
                langs.add(language)
            }
            return hljs.highlight(code, { language }).value;
        }})
    const renderer = new marked.Renderer();
    renderer.code = function (code, language) {
        //if (language in ['mermaid', 'markmap']) { return `<div class="${language}">${code}\n</div>`; }
        if (language == 'mermaid') { return '<div class="mermaid">' + code + '\n</div>'; }  // mermaid.js
        //else if (language == 'markmap') { return '<div class="markmap">' + markmap.autoLoader.renderAll() + '\n</div>'; }
        else if (language == 'markmap') { return '<div class="markmap">' + code + '\n</div>'; }
        else { return '<pre><code>\n' + hljs.highlightAuto(code).value + '\n</code></pre>'; } // highlight.js
    }
    marked.use({ renderer });
    async function setupHowToUse() {
        const res = await fetch(`md/how-to-use.md`)
        const src = await res.text()
//        document.getElementById('how-to-use').innerHTML = noveld.parse(src)
        document.getElementById('how-to-use').innerHTML = await marked.parse(src)
    }
    await setupHowToUse()

    /*
    console.log(noveld.getDefaultOptions())
    const hooks = { preprocess(md) { return noveld.parse(md) } };
    marked.use({ hooks });
    */

    marked.use({extensions:[getRubyExtension()]});

    MARKDOWN.addEventListener('input', async(event) => {
        const html = await marked.parse(event.target.value)
        HTML.value = html
        PREVIEW.innerHTML = html
    })
    MARKDOWN.dispatchEvent(new Event('input'))

    function setOptions(e) {
        const options = {}
        options[e.target.id] = ('checkbox'===e.target.type) ? e.target.checked : e.target.value
        noveld.setOptions(options)
        console.log(noveld.options)
        MARKDOWN.dispatchEvent(new Event('input'))
    }
    function initOptions() {
        const options = {}
        for (let id of ['ruby', 'break', 'thematicBreak', 'thematicBreakBorder', 'thematicBreakText']) {
            const el = document.getElementById(id)
            options[id] = ('checkbox'===el.type) ? el.checked : el.value
        }
        noveld.setOptions(options)
        console.log(noveld.options)
        MARKDOWN.dispatchEvent(new Event('input'))
    }
    document.getElementById('ruby').addEventListener('change', async(event) => { setOptions(event) } )
    document.getElementById('break').addEventListener('change', async(event) => { setOptions(event) } )
    document.getElementById('thematicBreak').addEventListener('change', async(event) => { setOptions(event) } )
    document.getElementById('thematicBreakBorder').addEventListener('change', async(event) => { setOptions(event) } )
    document.getElementById('thematicBreakText').addEventListener('input', async(event) => { setOptions(event) } )
    document.getElementById('init').addEventListener('click', async(event) => { document.getElementById('form').reset(); initOptions(); } )
//    document.getElementById('form').addEventListener('reset', async(event) => { initOptions() } )
//    document.querySelectorAll('').addEventListener('change', async(event) => {})
    
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

