[1mdiff --git a/docs/js/2/js/noveld.cls.js b/docs/js/2/js/noveld.cls.js[m
[1mindex 58d8af7..19322b2 100644[m
[1m--- a/docs/js/2/js/noveld.cls.js[m
[1m+++ b/docs/js/2/js/noveld.cls.js[m
[36m@@ -9,6 +9,31 @@[m [mclass Noveld {[m
         this.#parseSection(src)[m
     }[m
     */[m
[32m+[m[32m}[m
[32m+[m[32mclass Lexer {[m
[32m+[m[32m    lex(src) {[m
[32m+[m[32m        const textBlockRanges = [][m
[32m+[m[32m        this.#lines = src.trim().split(/\r?\n/)[m
[32m+[m[32m        const indexes = _indexes.filter(i=>((0===i && this.#lines[i] && !this.#lines[i+1]) || [this.#lines[i-1], this.#lines[i+1]].every(line=>!line)))[m
[32m+[m[32m        let [start, end] = [-1, -1][m
[32m+[m[32m        const chars = this.#lines.map(line=>line.length)[m
[32m+[m[32m        for (let i=0; i<this.#lines.length; i++) {[m
[32m+[m[32m            if (start < i && this.#lines[i]) { start = i; end = i; }[m
[32m+[m[32m            if (start < i && this.#lines[i])[m
[32m+[m[32m        }[m
[32m+[m
[32m+[m[32m        const textBlockRanges = [][m
[32m+[m[32m        let [start, end] = [-1, -1][m
[32m+[m[32m        for (let i=bodyRange.start; i<=bodyRange.end; i++) {[m
[32m+[m[32m            if (start < 0 && this.#lines[i]) { start = i; end = i; }[m
[32m+[m[32m            if (0 <= start) {[m
[32m+[m[32m                if (this.#lines[i].trim()) { end++; }[m
[32m+[m[32m                else { textBlockRanges.push(start, end) }[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m        return textBlockRanges[m[41m [m
[32m+[m
[32m+[m[32m    }[m
     #parseSection(src) {[m
         this.#sections = [][m
         //this.#lines = src.split(/\r?\n/).map(line=>line.trim()) // markdownを含めるならダメ[m
