window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const res = await fetch(`md/test.md`)
    const src = await res.text()
    marked.setOptions({async:true, gfm:true, breaks:true})
    //const hooks = { preprocess(md) { return noveld.parse(md) } };
    const hooks = { preprocess(md) { return new Noveld().parse(md) } };
    marked.use({ hooks });
    const html = await marked.parse(src)
    console.log(html)
    document.getElementById('content').innerHTML = html
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

