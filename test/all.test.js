const path = require('path');
const { load } = require('markdown-it-testgen');
const MarkdownIt = require('markdown-it');

/* 
   this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
load(path.join(__dirname, 'fixtures/default.txt'), (data) => {
  data.fixtures.forEach((fixture) => {
    const md = new MarkdownIt();
    md.use(require('../index'), {
      skipDelimitersCheck: fixture.header === '`skipDelimitersCheck` option',
    });

    test(fixture.header, function () {
      var expected = fixture.second.text,
        actual = md.render(fixture.first.text);

      expect(actual).toEqual(expected);
    });
  });
});
