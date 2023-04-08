window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const res = await fetch(`md/test.md`)
    const src = await res.text()
    marked.setOptions({async:true, gfm:true, breaks:true})
    console.log(noveld.getDefaultOptions())
    const hooks = { preprocess(md) { return noveld.parse(md) } };
    marked.use({ hooks });
    const html = await marked.parse(src)
    console.log(html)
    document.getElementById('content').innerHTML = html
    console.log(noveld.toDom(html))
    console.log(noveld.toHtml(noveld.toDom(html)))
    NoveldTest.test()
    /*
    const hooks = { preprocess(md) { return new Noveld().parse(md) } };
    marked.use({ hooks });
    const html = await marked.parse(src)
    console.log(html)
    document.getElementById('content').innerHTML = html
    console.log(new Noveld().toDom(html))
    console.log(new Noveld().toHtml(new Noveld().toDom(html)))
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx')
    */
    
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

