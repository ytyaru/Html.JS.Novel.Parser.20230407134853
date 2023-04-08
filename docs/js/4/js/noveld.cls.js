class Noveld {
    #options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}, section:true}
    setOptions(options) { this.#options = {...this.#options, ...options} }
    parse(src) {
        return new Lexer().lex(src)
    }
    toHtml(dom) { const s = new XMLSerializer(); return s.serializeToString(dom); }
    toDom(html) { const p = new DOMParser(); return p.parseFromString(html); }
}
class Lexer {
    #lines = null
    #textBlockRanges = []
    #html = []
    constructor() {
        //this.parser = new Parser()
    }
    lex(src) {
        this.#lines = src.trim().split(/\r?\n/)
        console.debug(this.#lines)
        this.#getTextBlockRanges()
        this.#clearHtml()
        for (let range of this.#textBlockRanges) {
            const lines = this.#lines.slice(range.start, range.end+1)
            this.#html.push((range.parse) ? range.parse(lines) : lines.join('\n'))
        }
        console.debug(this.#html)
        console.debug(this.#html.join('\n\n'))
        return this.#html.join('\n\n')
    }
    #clearHtml() { this.#html.splice(0) }
    #clearTextBlockRanges() { this.#textBlockRanges.splice(0) }
    #getTextBlockRanges() {
        this.#clearTextBlockRanges() 
//        const chars = this.#lines.map(line=>line.length).filter((len,i)=>0===len && )
//        const indexes = _indexes.filter(i=>((0===i && this.#lines[i] && !this.#lines[i+1]) || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))
        let [start, end] = [0, 0]
        for (var i=0; i<this.#lines.length; i++) {
//            console.log(i, this.#lines[i])
            if (this.#hasText(i)) {
                start = i
                end = this.#getTextBlockRangeEnd(start)
                this.#textBlockRanges.push({start:start, end:end})
                i = end
//                if (!this.#isLastLine(i) && !this.#hasText(i+1) {
//                    this.#textBlockRanges.push({start:start, end:i})
//                }
            } else {
                start = i
                end = this.#getBreakBlockRangeEnd(start)
                console.log('break', start, end)
                if (0 < end-start) { this.#textBlockRanges.push({start:start, end:end, parse:Parser.break}) }
                //if (0 < end-start) { this.#textBlockRanges.push({start:start, end:end, type:'break'}) }
                i = end
            }
        }
        console.debug(this.#textBlockRanges)
    }
    #isLastLine(i) { return i===this.#lines.length-1 }
    #hasText(i) { return this.#lines[i] }
    #getTextBlockRangeEnd(start) {
        for (var i=start; i<this.#lines.length; i++) {
            if (!this.#lines[i]) { return i-1; }
        }
        return i
    }
    #getBreakBlockRangeEnd(start) {
        for (var i=start; i<this.#lines.length; i++) {
            if (this.#lines[i]) { return i-1; }
        }
        return i
    }
}
class Parser {
    static break(lines) { return '<br>'.repeat(lines.length-1) }
}
/*
class Noveld {
    #options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}, section:true}
    setOptions(options) { this.#options = {...this.#options, ...options} }
    parse(src) {
        new Lexer().lex(src)
    }
    toHtml(dom) { const s = new XMLSerializer(); return s.serializeToString(dom); }
    toDom(html) { const p = new DOMParser(); return p.parseFromString(html); }
    inject(src, targetDom) {
        for (let section of this.#parseSection(src)) { targetDom.append(section) }
    }
}
    */
/*
class Lexer {
    #lines = null
    #textBlockRanges = []
    #html = []
    constructor() {
        this.parser = new Parser()
    }
    lex(src) {
        this.#lines = src.trim().split(/\r?\n/)
        console.debug(this.#lines)
        this.#getTextBlockRanges()
        this.#clearHtml()
        for (let range of this.#textBlockRanges) {
            this.#html.push(range.parser(this.#lines.slice(range.start, range.end+1)))
        }
        console.debug(this.#html)
    }
    #clearHtml() { this.#html.splice(0) }
    #clearTextBlockRanges() { this.#textBlockRanges.splice(0) }
    #getTextBlockRanges() {
        this.#clearTextBlockRanges() 
//        const chars = this.#lines.map(line=>line.length).filter((len,i)=>0===len && )
//        const indexes = _indexes.filter(i=>((0===i && this.#lines[i] && !this.#lines[i+1]) || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))
        let [start, end] = [0, 0]
        for (var i=0; i<this.#lines.length; i++) {
//            console.log(i, this.#lines[i])
            if (this.#hasText(i)) {
                start = i
                end = this.#getTextBlockRangeEnd(start)
                this.#textBlockRanges.push({start:start, end:end})
                i = end
//                if (!this.#isLastLine(i) && !this.#hasText(i+1) {
//                    this.#textBlockRanges.push({start:start, end:i})
//                }
            } else {
                start = i
                end = this.#getBreakBlockRangeEnd(start)
                console.log('break', start, end)
                if (0 < end-start) { this.#textBlockRanges.push({start:start, end:end, type:'break'}) }
                i = end
            }
        }
        console.debug(this.#textBlockRanges)
    }
    #isLastLine(i) { return i===this.#lines.length-1 }
    #hasText(i) { return this.#lines[i] }
    #getTextBlockRangeEnd(start) {
        for (var i=start; i<this.#lines.length; i++) {
            if (!this.#lines[i]) { return i-1; }
        }
        return i
    }
    #getBreakBlockRangeEnd(start) {
        for (var i=start; i<this.#lines.length; i++) {
            if (this.#lines[i]) { return i-1; }
        }
        return i
    }
    #getTextBlockRangeEnd(start) {
        for (var i=start; i<this.#lines.length; i++) {
            if (i===this.#lines.length-1) { return i; }
            else if (this.#lines[i+1]) { return i; }
            else { i = this.#getBreakBlock(i) }
        }
        return i
    }
}
*/


/*
class Parser {
    parse(src) {
    }
    toHtml(dom) { const s = new XMLSerializer(); return s.serializeToString(dom); }
    toDom(html) { const p = new DOMParser(); return p.parseFromString(html); }

}
// ContainerBlock
class SectionParser { static parse(lines) { return `<section><h1>${heading}</h1>${lines.join('<br>')}</section>` } }
class ParagraphParser { static parse(lines) { return `<p>${lines.join('<br>')}</p>` } }
class BreakParser { static parse(lines) { return '<br>'.repeat(lines.length) } }

// LeafBlock

// inline
class RubyParser { static parse(rb, rt) { return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>` } }
class EmParser { static parse(text) { return `<em>${text}</em>` } }
*/




/*
class Lexer {
    lex(src) {
        const textBlockRanges = []
        this.#lines = src.trim().split(/\r?\n/)
        const indexes = _indexes.filter(i=>((0===i && this.#lines[i] && !this.#lines[i+1]) || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))
        let [start, end] = [-1, -1]
        const chars = this.#lines.map(line=>line.length)
        for (let i=0; i<this.#lines.length; i++) {
            if (start < i && this.#lines[i]) { start = i; end = i; }
            if (start < i && this.#lines[i]) {}
        }

        const textBlockRanges = []
        let [start, end] = [-1, -1]
        for (let i=bodyRange.start; i<=bodyRange.end; i++) {
            if (start < 0 && this.#lines[i]) { start = i; end = i; }
            if (0 <= start) {
                if (this.#lines[i].trim()) { end++; }
                else { textBlockRanges.push(start, end) }
            }
        }
        return textBlockRanges 

    }
    #parseSection(src) {
        this.#sections = []
        //this.#lines = src.split(/\r?\n/).map(line=>line.trim()) // markdownを含めるならダメ
        this.#lines = src.split(/\r?\n/)
        const _indexes = this.#lines.map((line,idx)=>(line.startsWith('# ')) ? idx : -1).filter(i=>-1<i)
        //const indexes = _indexes.filter(i=>(0===i || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line.trim())))
        const indexes = _indexes.filter(i=>(0===i || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))
        for (let i=0; i<indexes.length; i++) {
            const heading = this.#lines[indexes[i]].slice(2)
            const bodyRange = {start: i+1, end: ((i+1 < indexes.length) ? indexes[i+1] : indexes.length-1)}
            // startの値を連続した空白行の数だけインクリメントする
            let a = 1;  while (indexes[i]+a < this.#lines.length) { if (!this.#lines[indexes[i]+a]) { bodyRange++; } else { break; } a++; }
            this.#sections.push(createSection(heading, bodyRange))
        }
    }
    #createSection(heading, bodyRange) {
        const section = document.createElement('section')
        const h1 = document.createElement('h1')
        h1.textContent = heading
        section.append(h1)
        section.append(this.createSectionBody(bodyRange))
        return section
    }
    #createSectionBody(bodyRange) {
        const textBlockRanges = this.#getTextBlockRanges(bodyRange)
        for (let range of this.#getTextBlockRanges(bodyRange)) {
            
        }
        // p, hr（複数行にまたがって判定する必要がある）
        for (let i=bodyRange.start; i<=bodyRange.end; i++) {
            this.#lines[i]

        }
    }
    #getTextBlockRanges(bodyRange) {
        const textBlockRanges = []
        let [start, end] = [-1, -1]
        for (let i=bodyRange.start; i<=bodyRange.end; i++) {
            if (start < 0 && this.#lines[i]) { start = i; end = i; }
            if (0 <= start) {
                if (this.#lines[i].trim()) { end++; }
                else { textBlockRanges.push(start, end) }
            }
        }
        return textBlockRanges 
    }
    #routeElementType(start, end) {
        this.#isTematicBreak(start, end)
        range.start
    }
    #isSection() {}
    #isParagraph() {}
    #isEm() {}
    #isRuby() {}
    #isTematicBreak(start, end) { return (1===end-start && '---'===this.#lines[start]) }
    #isHtml(start, end) { return this.#lines[start].startsWith('<') }

    #parseSection() {}
    #parseParagraph() {}
    #parseEm() {}
    #parseRuby() {}
    #parseTematicBreak() {}

    // ○this[メソッド名](引数)
    // ✕ this[#メソッド名](引数)
    // https://stackoverflow.com/questions/61197325/js-dynamically-access-private-fields-properties-members
    
    //for (let key of ['Section', 'Paragraph', 'Break', 'Em', 'Ruby', 'TematicBreak', 'Html']) {
    //    if (this[`_is${key}](start, end)) { this[`_parse${key}`].parse() }

    #isTextBlock() { return ([this.#lines[i-1], this.#lines[i+1]].every(line=>0===line.trim().length)) }
    #appendContents(section, contents) { for (let c of contents) { section.append(c) } }
       
       
    }

    toHtml(dom) { const s = new XMLSerializer(); return s.serializeToString(dom); }
    toDom(html) { const p = new DOMParser(); return p.parseFromString(html); }
}
*/


/*
class Lexer {
    constructor() {
        this.inlines = [Em, Ruby, ThematicBreak]
        this.leafBlocks = []
        this.containerBlocks = []
    }
    lex(src) {
        this.containerBlocks.map(p=>p.parse()
    }
}
var noveld = new Noveld()
class InlineElement {
    parse(src) { return src }
}
class LeafBlockElement {
    parse(src) { return src }
}
class ContainerBlockElement {
    parse(src) { return src }
}



var _Noveld = function() {
    this._options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}, section:true}
    this._methods = new Map()
    this._regexEscapeRuby = /｜《/g
    this._regexShortRuby = /([一-龠々仝〆〇ヶ]{1,50})《([^｜《》\n\r]{1,20})》/g
    this._regexLongRuby = /[｜]([^｜《》\n\r]{1,50})《([^｜《》\n\r]{1,20})》/g
    this._regexEm = /《《([^｜《》\n]{1,50}?)》》/g;
    this._regexThematicBreak = /^[\n][\-]{3}[\n]$/g;
    this._regexHeading = /^# (.+)$/g;
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
    this._parseSection = (src)=>{ // # 前後行が空行かつ該当行の文字列が# に完全一致したらセクションとする
        const lines = src.split(/\r?\n/)
        const _indexes = lines.map((line,idx)=>(line.startsWith('# ')) ? idx : -1).filter(i=>-1<i)
        const indexes = _indexes.filter(i=>(0===i || [lines[i-1], lines[i+1]].every(line=>!line.trim())))
        for (let i of indexes) {
            lines[i] = ((i===indexes[0]) ? '' : '</section>') + `<section><h1>${lines[i].slice(2)}</h1>`
        }
        console.log(indexes)
        console.log(lines)
        return lines.join('\n')
    }
    this._toSection= (heading, body)=>{ return `<section><h1>${heading}</h1>${body}</section>` }


    this._parseLines = (src)=>{
        [this._parseSection, this._parseThematicBreak, this._parseParagraph].map(method=>mathod(lines))
        
        this.parse = (src)=>[...this._methods.keys()].reduce((src, key)=>(this._options[key]) ? this._methods.get(key)(src): src, src)


        const lines = src.split(/\r?\n/)
        [this._parseSection, this._parseThematicBreak, this._parseParagraph].map(method=>mathod(lines))
//        this._parseThematicBreak(lines)
//        this._parseParagraph(lines)
        return lines.join('\n')
    }

    this._methods.set('section', this._parseSection)
    this._methods.set('thematicBreak', this._parseThematicBreak )
    this._methods.set('breaks', this._parseParagraph)
    this._methods.set('em', this._parseEm)
    this._methods.set('ruby', this._parseRuby)
}
var noveld = new _Noveld()
*/

