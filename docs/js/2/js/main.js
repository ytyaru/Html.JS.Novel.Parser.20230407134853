window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    /*
    class C {
        methodA(msg) { console.debug(`A: ${msg}`) }
        methodB(msg) { console.debug(`B: ${msg}`) }
        #methodC(msg) { console.debug(`B: ${msg}`) }
        //method() { this['methodA']('引数') }
        //method() { this['#methodC']('引数') } // エラー
        method() { C['#methodC']('引数') } // エラー
    }
    const c = new C()
    console.log(c)
    C.#methodC('C')
    c.method()
    */
//    console.debug(new Parser().toHtml(document))
//    console.debug(new Parser().toHtml(document.createElement('div')))
    const res = await fetch(`md/test.md`)
    const md = await res.text()
    document.getElementById('content').innerHTML = noveld.parse(md)
    console.debug(new Noveld().parse(md))
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

