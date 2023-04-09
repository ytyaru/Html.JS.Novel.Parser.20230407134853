function getRubyShortExtension() { // 漢字《かんじ》
    //const SHORT = new RegExp(/([^｜《》\n]+)?([一-龠々仝〆〇ヶ]{1,50})《([^｜《》\n\r]{1,20})》([^｜《》\n]+)?/, '')
    const SHORT = new RegExp(/([^｜《》\n一-龠々仝〆〇ヶ]{1,50})?([一-龠々仝〆〇ヶ]{1,50})《([^｜《》\n\r]{1,20})》([^｜《》\n]+)?/, '')
    return {
        name: 'ruby-short',
        level: 'inline',
        start(src) { return src.match(SHORT)?.index; },
        tokenizer(src, tokens) {
            const match = SHORT.exec(src);
            if (match) {
                console.log(src, tokens, match, SHORT)
                const token = {
                    type: 'ruby-short',   // Should match "name" above
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

