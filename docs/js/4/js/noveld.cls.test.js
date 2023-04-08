class NoveldTest {
    static test() {
        console.log('NoveldTest start')
        // options
        this.#testOptions(noveld.options)
        // getDefaultOptions
        this.#testOptions(noveld.getDefaultOptions())
        // setOptions
        noveld.setOptions({ruby:false}); console.assert(false===noveld.options.ruby);
        noveld.setOptions({break:false}); console.assert(false===noveld.options.break);
        noveld.setOptions({thematicBreak:false})
        console.assert(false===noveld.options.thematicBreak);
        /*
        noveld.setOptions({thematicBreak:{border:false,text:'＊'}})
        console.assert(false===noveld.options.thematicBreak.border);
        console.assert('＊'===noveld.options.thematicBreak.text);
        */
        // parse
        let src = "山《やま》\n\n\n｜ABC《えーびーしー》\n\n---\n\nおわり。"
        console.log(src.split(/\n/))
        console.log(noveld.parse(src).split(/\n/))
        console.assert(src==noveld.parse(src));

        console.log('%cOK! NoveldTest', `color:green; background:white;`)
    }
    static #testOptions(options) {
        console.assert(['ruby', 'break', 'thematicBreak'].every(key=>noveld.options.hasOwnProperty(key)))
        console.assert(options.ruby)
        console.assert(options.break)
        console.assert(options.thematicBreak)
        console.assert(options.thematicBreak.border)
        console.assert('◇◆◇◆'===options.thematicBreak.text)
    }
}
