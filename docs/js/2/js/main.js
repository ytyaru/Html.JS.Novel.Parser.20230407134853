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
    const res = await fetch(`md/test.md`)
    document.getElementById('content').innerHTML = noveld.parse(await res.text())
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

