function getRubyExtension() {
const rubyShort = new RegExp(/([一-龠々仝〆〇ヶ]{1,50})《([^|｜《》\n\r]{1,20})》/, '') // 漢字《かんじ》
const rubyLong = new RegExp(/[｜]([^一-龠々仝〆〇ヶ|｜《》\n\r]{1,50})《([^|｜《》\n\r]{1,20})》/, '') // ｜ABC《えーびーしー》
//const rubyShort = new RegExp(/([^｜]*)([一-龠々仝〆〇ヶ]{1,50})《([^|｜《》\n\r]{1,20})》(.*)/, '') // 漢字《かんじ》
//const rubyLong = new RegExp(/([^｜]*)[｜]([^一-龠々仝〆〇ヶ|｜《》\n\r]{1,50})《([^|｜《》\n\r]{1,20})》(.*)/, '') // ｜ABC《えーびーしー》
return {
  name: 'ruby',
  level: 'inline',
  //start(src) { return src.match(/｜/)?.index; },    // Hint to Marked.js to stop and check for a match
  start(src) { return Math.min(src.match(rubyShort)?.index, src.match(rubyLong)?.index); },
  tokenizer(src, tokens) {
    console.log('tokenizer')
    for (let regex of [rubyLong, rubyShort]) {
      let match = regex.exec(src);
      if (match) {
        console.log(src, match, regex)
        //regex.test(src)
        return {          // Token to generate
          type: 'ruby',   // Should match "name" above
          //raw: src,  // Text to consume from the source
          raw: match[0],  // Text to consume from the source
          rb: match[1],
          rt: match[2],
          //prefix: src.split(regex.index),
          //suffix: src.split(regex.lastIndex)
//          prefix: match.input.slice(index),
//          suffix: ''
        };
//        this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
//        return token;
      }
    }
  },
  renderer(token) {
    //return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
    return `<ruby>${token.rb}<rp>（</rp><rt>${token.rt}</rt><rp>）</rp>`
  }
}
}
/*
const ruby = {
  name: 'ruby',
  level: 'inline',
  start(src) { return src.match(/｜/)?.index; },    // Hint to Marked.js to stop and check for a match
  tokenizer(src, tokens) {
    const rule = /^:([^:\n]+):([^:\n]*)(?:\n|$)/;  // Regex for the complete token, anchor to string start

    const match = rule.exec(src);
    if (match) {
      return {                                         // Token to generate
        type: 'description',                           // Should match "name" above
        raw: match[0],                                 // Text to consume from the source
        dt: this.lexer.inlineTokens(match[1].trim()),  // Additional custom properties, including
        dd: this.lexer.inlineTokens(match[2].trim())   //   any further-nested inline tokens
      };
    }
  },
  renderer(token) {
    return `\n<dt>${this.parser.parseInline(token.dt)}</dt><dd>${this.parser.parseInline(token.dd)}</dd>`;
  },
  childTokens: ['dt', 'dd'],                 // Any child tokens to be visited by walkTokens
};
*/

