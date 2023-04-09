function getRubyRenderer() { // https://github.com/markedjs/marked/blob/4aee878ac913e55941407897a8221040f8817b48/src/Renderer.js
    const renderer = new marked.Renderer();
    return {
        blockquote(quote) { return `<blockquote>\n${RubyParser.parse(text)}</blockquote>\n` },
        heading(text, level, raw, slugger) {
            if (this.options.headerIds) { return `<h${level} id="${this.options.headerPrefix + slugger.slug(raw)}">${RubyParser.parse(text)}</h${level}>\n` }
            else { return `<h${level}>${RubyParser.parse(text)}</h${level}>\n` }
        },
        listitem(text, task, checked) { return `<li>${RubyParser.parse(text)}</li>\n` },
        paragraph(text) { return `<p>${RubyParser.parse(text)}</p>\n` },
        table(header, body) {
            if (body) body = `<tbody>${RubyParser.parse(body)}</tbody>`;
            return `<table>\n<thead>\n${RubyParser.parse(header)}</thead>\n${body}</table>\n`
        },
        strong(text) { return `<strong>${RubyParser.parse(text)}</strong>` },
        em(text) { return `<em>${RubyParser.parse(text)}</em>` },
        del(text) { return `<del>${RubyParser.parse(text)}</del>` },
        link(href, title, text) { return RubyParser.parse(renderer.link(href, title, text)) },
        text(text) { return RubyParser.parse(text) },
    }
}
