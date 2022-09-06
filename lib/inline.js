'use strict';

const { isValidDelim } = require('./util');

/**
 * @param {*} state
 * @param {boolean} silent
 * @param {boolean} skipValidDelimCheck
 * @returns
 */
function math_inline(state, silent, skipDelimitersCheck = false) {
  let start, match, token, res, pos;

  if (state.src[state.pos] !== '$') {
    return false;
  }

  res = isValidDelim(state, state.pos, skipDelimitersCheck);

  if (!res.can_open) {
    if (!silent) {
      state.pending += '$';
    }

    state.pos += 1;

    return true;
  }

  // First check for and bypass all properly escaped delimieters
  // This loop will assume that the first leading backtick can not
  // be the first character in state.src, which is known since
  // we have found an opening delimieter already.
  start = state.pos + 1;
  match = start;
  while ((match = state.src.indexOf('$', match)) !== -1) {
    // Found potential $, look for escapes, pos will point to
    // first non escape when complete
    pos = match - 1;

    while (state.src[pos] === '\\') {
      pos -= 1;
    }

    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 == 1) {
      break;
    }

    match += 1;
  }

  // No closing delimter found. Consume $ and continue.
  if (match === -1) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos = start;
    return true;
  }

  // Check if we have empty content, ie: $$. Do not parse.
  if (match - start === 0) {
    if (!silent) {
      state.pending += '$$';
    }

    state.pos = start + 1;

    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match, skipDelimitersCheck);
  if (!res.can_close) {
    if (!silent) {
      state.pending += '$';
    }

    state.pos = start;

    return true;
  }

  if (!silent) {
    token = state.push('math_inline', 'math', 0);
    token.markup = '$';
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;

  return true;
}

module.exports = math_inline;
