# KaTeX Plugin for MarkdownIt

Add Math to your Markdown.

> This package a fork of [`@neilsustc/markdown-it-katex`](https://github.com/yzhang-gh/markdown-it-katex).

[KaTeX](https://github.com/KaTeX/KaTeX) is a faster alternative to MathJax. This plugin makes it easy to support in your markdown.

## Usage

Install [`markdown-it`](https://github.com/markdown-it/markdown-it) and this plugin:

```bash
npm install markdown-it katex @renbaoshuo/markdown-it-katex
```

Then use it in your javascript:

```javascript
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();
md.use(require('@renbaoshuo/markdown-it-katex'));

// double backslash is required for javascript strings, but not html input
const result = md.render('# Math\n\n$\\sqrt{3x - 1} + (1 + x)^2$\n');
```

Include the KaTeX stylesheet in your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
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
$\sqrt{3x - 1} + (1 + x)^2$
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

## Author

**`@renbaoshuo/markdown-it-katex`** © [Baoshuo](https://github.com/renbaoshuo), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Baoshuo with help from [contributors](https://github.com/renbaoshuo/markdown-it-katex/contributors).

> [Personal Website](https://baoshuo.ren) · [Blog](https://blog.baoshuo.ren) · GitHub [@renbaoshuo](https://github.com/renbaoshuo) · Twitter [@renbaoshuo](https://twitter.com/renbaoshuo)
