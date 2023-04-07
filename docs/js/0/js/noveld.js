var _Noveld = function() {
    this._options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}}
    this._methods = new Map()
    this._regexEscapeRuby = /｜《/g
    this._regexShortRuby = /([一-龠々仝〆〇ヶ]{1,50})《([^｜《》\n\r]{1,20})》/g
    this._regexLongRuby = /[｜]([^｜《》\n\r]{1,50})《([^｜《》\n\r]{1,20})》/g
    this._regexEm = /《《([^｜《》\n]{1,50}?)》》/g;
    this._regexThematicBreak = /^[\n][\-]{3}[\n]$/g;
    this.setOptions = (options)=>{ this._options = {...this._options, ...options} }
    this.parse = (src)=>[...this._methods.keys()].reduce((src, key)=>(this._options[key]) ? this._methods.get(key)(src): src, src)
    this._parseRuby = (src)=>{
        return this._escapeRuby([this._regexLongRuby, this._regexShortRuby].reduce((src, reg)=>
            src.replace(reg, (match, rb, rt)=>{ return this._toRuby(rb, rt) }), src))
    }
    this._escapeRuby = (src)=>src.replace(this._regexEscapeRuby, (match)=>'《')
    this._toRuby = (rb, rt)=>`<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`
    this._parseEm = (src)=>src.replace(this._regexEm, (match,text)=>`<em class="emphasis">${text}</em>`)
    this._parseParagraph = (src)=>{
        const html = []
        const contents = [] // パラグラフ内のテキストコンテンツ（一行毎）
        for (let line of src.split(/\r?\n/)) {
            line = line.trim() // やらないとスペース＋空行2つで<p> </p>という不可視のパラグラフが作れてしまう
            if (line) { contents.push(line) }
            else {
                if (0 < contents.length) { html.push(`<p>${contents.join(`<br>`)}</p>`); contents.splice(0); }
                else { if (this._options.breaks) { html.push(`<br>`) } } // <p>要素間の<br>。省略したいときもあるかも？
            }
        }
        if (0 < contents.length) { html.push(`<p>${contents.join(`<br>`)}</p>`); contents.splice(0); }
        return html.join('\n')
    }
    this._parseThematicBreak = (src)=>{ // --- 前後行が空行かつ該当行の文字列が---に完全一致したら場面転換とする
        if (!this._options.thematicBreak) { return src }
        const html = []
        const lines = src.split(/\r?\n/)
        const indexes = lines.map((line,idx)=>('---'===line) ? idx : -1).filter(i=>0<i)
        for (let i=0; i<lines.length; i++) {
            if (indexes.includes(i) && i < lines.length-1) {
                if ([lines[i-1], lines[i+1]].every(line=>0===line.trim().length)) { html.push(this._toThematicBreak()) }
            } else { html.push(lines[i]) }
        }
        return html.join('\n')
    }
    this._toThematicBreak = ()=>{
        const clss = ['scene-change']
        if (this._options.thematicBreak.border) { clss.push('scene-change-border') }
        return `<div class="${clss.join(' ')}"><p>${this._options.thematicBreak.text}</p></div>`
    }
    this._methods.set('thematicBreak', this._parseThematicBreak )
    this._methods.set('breaks', this._parseParagraph)
    this._methods.set('em', this._parseEm)
    this._methods.set('ruby', this._parseRuby)
}
var noveld = new _Noveld()

