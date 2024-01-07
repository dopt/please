const fs = require('fs');
const peggy = require('peggy');
const tspegjs = require('ts-pegjs');

fs.readFile('src/parser.pegjs', function (err, data) {
  if (err) throw err;
  const parser = peggy.generate(data.toString(), {
    output: 'source',
    // Helps in debugging
    // trace: true,
    cache: true,
    plugins: [tspegjs],
    tspegjs: {
      customHeader: "import { AstNode, types } from './ast';",
    },
    returnTypes: {
      startRuleFunctions: 'object',
      startRuleFunction: 'object',
      please: 'object',
      argument: 'object',
      argument_list: 'object',
      lsep: 'object',
      colon: 'object',
      pkg_expr: 'object',
      pkg_glob: 'object',
      identifier: 'object',
      _: 'object',
    },
  });
  fs.writeFileSync('src/parser.ts', parser);
});
