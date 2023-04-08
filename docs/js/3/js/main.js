window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const res = await fetch(`md/test.md`)
    const src = await res.text()
//    console.debug(new Noveld().parse(md))
//    console.debug(noveld._parseRuby(md))
    //console.debug(noveld.parse(md))
    marked.setOptions({async:true, gfm:true, breaks:true})
    const hooks = { preprocess(md) { return noveld.parse(md) } };
    marked.use({ hooks });
//    marked.use({ { preprocess(md) { return noveld.parse(md) } } });
    const html = await marked.parse(src)
    console.log(html)
    document.getElementById('content').innerHTML = html
    //console.debug(await marked.parse(noveld.parse(md)))
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

