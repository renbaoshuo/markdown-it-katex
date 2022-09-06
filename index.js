'use strict';

const katex = require('katex');
const inline = require('./lib/inline');
const block = require('./lib/block');

function markdownItKatexPlugin(md, options) {
  options = options || {};

  const render = (latex, displayMode = false) => {
    try {
      return katex.renderToString(latex, { ...options, displayMode });
    } catch (error) {
      if (options.throwOnError) {
        console.log(error);
      }

      return latex;
    }
  };

  md.inline.ruler.after('escape', 'math_inline', (state, silent) =>
    inline(state, silent, options.skipDelimitersCheck)
  );
  md.block.ruler.after('blockquote', 'math_block', block, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  md.renderer.rules.math_inline = (tokens, idx) => render(tokens[idx].content);
  md.renderer.rules.math_block = (tokens, idx) =>
    '<p>' + render(tokens[idx].content, true) + '</p>\n';
}

module.exports = markdownItKatexPlugin;
