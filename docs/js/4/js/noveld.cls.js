(function () {
    class Noveld {
        #s; #p;
        #options = {em:true, ruby:true, breaks:true, thematicBreak:{border:true, text:'◇◆◇◆'}, section:true}
        getDefaultOptions(options) { return [this.#options].map((element)=>{ return {...element} })[0] }
        setOptions(options) { this.#options = {...this.#options, ...options} }
        parse(src) { return new Lexer(this.#options).lex(new RubyParser().parse(src)) }
        toHtml(dom) { this.#s = this.#s || new XMLSerializer(); return this.#s.serializeToString(dom); }
        toDom(html) { this.#p = this.#p || new DOMParser(); return this.#p.parseFromString(html, 'text/html'); }
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
            let [start, end] = [0, 0]
            for (var i=0; i<this.#lines.length; i++) {
                start = i
                const isBreakBlock = !this.#lines[i]
                end = this.#getBlockRangeEnd(start, isBreakBlock)
                const isPush = ((isBreakBlock) ? ((0 < end-start) ? true : false) : true)
                if (isPush) { this.#textBlocks.push(new TextBlock(start, end)) }
                i = end
            }
            console.debug(this.#textBlocks)
        }
        #getBlockRangeEnd(start, isBreak=false) {
            for (var i=start; i<this.#lines.length; i++) {
                if (isBreak) { if (this.#lines[i]) { return i-1 } } // BreakBlockRangeEnd
                else { if (!this.#lines[i]) { return i-1 } }        // TextBlockRangeEnd
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
    window.noveld = window.noveld || new Noveld()
})();

