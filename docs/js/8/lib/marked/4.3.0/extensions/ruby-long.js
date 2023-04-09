function getRubyLongExtension() { // ｜ABC《えーびーしー》
    const LONG = new RegExp(/([^｜《》\n]+)?[｜]([^｜《》\n\r]{1,50})《([^｜《》\n\r]{1,20})》([^｜《》\n]+)?/, '')
    return {
        name: 'ruby-long',
        level: 'inline',
        start(src) { return src.match(LONG)?.index; },
        tokenizer(src, tokens) {
            const match = LONG.exec(src);
            if (match) {
                console.log(src, tokens, match, LONG)
                const token = {
                    type: 'ruby-long',   // Should match "name" above
                    raw: src,  // Text to consume from the source
                    //raw: match[0],  // Text to consume from the source
                    rb: match[2],
                    rt: match[3],
                    prefix: (match[1]) ? this.lexer.inlineTokens(match[1]) : '',
                    suffix: (match[4]) ? this.lexer.inlineTokens(match[4]) : '',
                    tokens: [],
                }
                console.log(token)
                return token
            }
        },
        renderer(token) {
            return `${this.parser.parseInline(token.prefix)}<ruby>${token.rb}<rp>（</rp><rt>${token.rt}</rt><rp>）</rp></ruby>${this.parser.parseInline(token.suffix)}`
        }
    }
}

