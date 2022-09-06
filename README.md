# `@renbaoshuo/markdown-it-katex`

> This package a fork of [`@neilsustc/markdown-it-katex`](https://github.com/yzhang-gh/markdown-it-katex).

Add Math to your Markdown.

[KaTeX](https://github.com/Khan/KaTeX) is a faster alternative to MathJax. This plugin makes it easy to support in your markdown.

Need convincing?

- Check out the comparative benchmark: [KaTeX vs MathJax](https://jsperf.com/katex-vs-mathjax/42)
- Try it in your browser: [markdown-it-katex demo](http://waylonflinn.github.io/markdown-it-katex/)

## Usage

Install markdown-it

```bash
npm install markdown-it
```

Install the plugin

```bash
npm install @renbaoshuo/markdown-it-katex
```

Use it in your javascript

```javascript
var md = require('markdown-it')(),
  mk = require('@renbaoshuo/markdown-it-katex');

md.use(mk);

// double backslash is required for javascript strings, but not html input
var result = md.render('# Math Rulez!\n  $\\sqrt{3x-1}+(1+x)^2$');
```

Include the KaTeX stylesheet in your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"
/>
```

If you're using the default markdown-it parser, I also recommend the [github stylesheet](https://github.com/sindresorhus/github-markdown-css):

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.css"
/>
```

`KaTeX` options can be supplied with the second argument to use.

```javascript
md.use(mk, { throwOnError: false, errorColor: '#cc0000' });
```

## Examples

### Inline

Surround your LaTeX with a single `$` on each side for inline rendering.

```markdown
$d = \gcd(a, b)$
```

### Block

Use two (`$$`) for block rendering. This mode uses bigger symbols and centers
the result.

```markdown
$$
\begin{aligned}
d & = ax + by \\
  & = by + (a \bmod b)x \\
  & = by + (a - \lfloor \frac{a}{b} \rfloor b )x \\
  & = ax + b(y - \lfloor \frac{a}{b} \rfloor x)
\end{aligned}
$$
```

## Syntax

Math parsing in markdown is designed to agree with the conventions set by pandoc:

> Anything between two $ characters will be treated as TeX math. The opening $ must have a non-space character immediately to its right, while the closing $ must have a non-space character immediately to its left, and must not be followed immediately by a digit. Thus, $20,000 and $30,000 won’t parse as math. If for some reason you need to enclose text in literal $ characters, backslash-escape them and they won’t be treated as math delimiters.

If you do not follow the above behavior, pass the `skipDelimitersCheck` option as true.

## Math Syntax Support

KaTeX is based on TeX and LaTeX. Support for both is growing. Here's a list of currently supported functions: [Function Support in KaTeX](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX).
