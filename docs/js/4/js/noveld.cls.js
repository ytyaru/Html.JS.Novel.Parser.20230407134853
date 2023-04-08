class Noveld {
    #options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}, section:true}
    setOptions(options) { this.#options = {...this.#options, ...options} }
    parse(src) {
        return new Lexer(this.#options).lex(new RubyParser().parse(src))
    }
    toHtml(dom) { const s = new XMLSerializer(); return s.serializeToString(dom); }
    toDom(html) { const p = new DOMParser(); return p.parseFromString(html); }
}
class Lexer {
    #options
    #lines = null
    #textBlocks = []
    #html = []
    constructor(options) { this.#options = options }
    lex(src) {
        this.#lines = src.trim().split(/\r?\n/)
        console.debug(this.#lines)
        this.#getTextBlockRanges()
        this.#clearHtml()
        for (let block of this.#textBlocks) {
            const lines = this.#lines.slice(block.start, block.end+1)
            this.#html.push(block.parse(lines, this.#options))
        }
        console.debug(this.#html)
        console.debug(this.#html.join('\n\n'))
        return this.#html.join('\n\n')
    }
    #clearHtml() { this.#html.splice(0) }
    #clearTextBlockRanges() { this.#textBlocks.splice(0) }
    #getTextBlockRanges() {
        this.#clearTextBlockRanges() 
//        const chars = this.#lines.map(line=>line.length).filter((len,i)=>0===len && )
//        const indexes = _indexes.filter(i=>((0===i && this.#lines[i] && !this.#lines[i+1]) || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))
        let [start, end] = [0, 0]
        for (var i=0; i<this.#lines.length; i++) {
            /*
            start = i
            end = (this.#hasText(i)) ? this.#getTextBlockRangeEnd(start) : this.#getBreakBlockRangeEnd(start)
            if (this.#hasText(i)) {  this.#textBlockRanges.push({start:start, end:end}) }
            else { if (0 < end-start) { this.#textBlockRanges.push({start:start, end:end, parse:Parser.break}) } }
            */

            if (this.#hasText(i)) {
                start = i
                end = this.#getTextBlockRangeEnd(start)
                this.#textBlocks.push(new TextBlock(start, end))
                i = end
            } else {
                start = i
                end = this.#getBreakBlockRangeEnd(start)
                console.log('break', start, end)
                if (0 < end-start) { this.#textBlocks.push(new TextBlock(start, end)) }
                i = end
            }
            /*
            */
        }
        console.debug(this.#textBlocks)
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
class TextBlock {
    constructor(start, end) { this.start = start; this.end = end; }
    parse(lines, options) { return this.#getParser(lines)(lines, options) }
    #getParser(lines) {
        if (!lines[0]) { return Parser.break }
        else if ('---'===lines[0] && this.start===this.end) { return Parser.thematicBreak }
        else { return Parser.html }
    }
}
class Parser {
    static break(lines, options) { return '<br>'.repeat(lines.length-1) }
    static thematicBreak(lines, options) { return `<div class="scene-change${(options.thematicBreak.border) ? ' scene-change-border' : ''}"><p>${options.thematicBreak.text}</p></div>` }
    static html(lines, options) { return lines.join('\n') }
}
class RubyParser {
    #SHORT = /([一-龠々仝〆〇ヶ]{1,50})《([^｜《》\n\r]{1,20})》/g
    #LONG = /｜([^｜《》\n\r]{1,50})《([^｜《》\n\r]{1,20})》/g
    #ESCAPE = /｜《/g
    parse(src) { return this.#escape([this.#LONG, this.#SHORT].reduce((src, reg)=>
            src.replace(reg, (match, rb, rt)=>{ return this.#toHtml(rb, rt) }), src)) }
    #escape(src) { return src.replace(this.#ESCAPE, (match)=>'《') }
    #toHtml(rb, rt) { return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>` }
}

