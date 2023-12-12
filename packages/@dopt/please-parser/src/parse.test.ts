import { describe, it, expect } from "vitest";
import { parse } from "./";

[
  {
    describe: "Clean/simple input/usages",
    cases: [
      {
        it: "can parse single-command single-package arguments",
        in: "please a:@a/a",
        out: [["a", ["@a/a"]]],
      },
      {
        it: "can parse single kebab-case command + single-package arguments",
        in: "please a-a:@a/a",
        out: [["a-a", ["@a/a"]]],
      },
      {
        it: "can parse single kebab-case command + single-package arguments",
        in: "please a-a:@a/a-a",
        out: [["a-a", ["@a/a-a"]]],
      },
      {
        it: "can parse single snake-case command + single-package arguments",
        in: "please a_a:@a/a_a",
        out: [["a_a", ["@a/a_a"]]],
      },
      {
        it: "can parse multi-single-package-commands",
        in: "please a:@a/a b:@b/b",
        out: [
          ["a", ["@a/a"]],
          ["b", ["@b/b"]],
        ],
      },
      {
        it: "can parse single-command + multi-package",
        in: "please a:@a/a,@b/b",
        out: [["a", ["@a/a", "@b/b"]]],
      },
      {
        it: "can parse multi-command + multi-package",
        in: "please a:@a/a,@a/b b:@b/a,@b/b",
        out: [
          ["a", ["@a/a", "@a/b"]],
          ["b", ["@b/a", "@b/b"]],
        ],
      },
    ],
  },
  {
    describe: "Escaped package script names",
    cases: [
      {
        it: "supports colon delimiters in package scripts",
        in: "please {a:a}:@a/a",
        out: [["a:a", ["@a/a"]]],
      },
      {
        it: "supports colon delimiters in package scripts",
        in: "please {a:::a}:@a/a",
        out: [["a:::a", ["@a/a"]]],
      },
    ],
  },
  {
    describe: "Wildcard packages",
    cases: [
      {
        it: "can parse single-command single-package w/ wildcards",
        in: "please a:{@a/*}",
        out: [["a", ["{@a/*}"]]],
      },
      {
        it: "can parse single-command multi-package w/ wildcards",
        in: "please a:{@a/*},{@b/*}",
        out: [["a", ["{@a/*}", "{@b/*}"]]],
      },
      {
        it: "can parse single-command multi-package w/ wildcards",
        in: "please a:{@a/*},{@b/*},{@*/*}",
        out: [["a", ["{@a/*}", "{@b/*}", "{@*/*}"]]],
      },
      {
        it: "can parse multi-command multi-package w/ wildcards",
        in: "please a:{@a/*},{@b/*},{@*/*} b:{@c/*},{@d/*},{@*/*}",
        out: [
          ["a", ["{@a/*}", "{@b/*}", "{@*/*}"]],
          ["b", ["{@c/*}", "{@d/*}", "{@*/*}"]],
        ],
      },
      {
        it: "can parse multi-command multi-package w/ wildcards and literal packages",
        in: "please a:{@a/*},@joe/package,{@*/*} b:{@c/*},@meeko/package,{@*/*}",
        out: [
          ["a", ["{@a/*}", "@joe/package", "{@*/*}"]],
          ["b", ["{@c/*}", "@meeko/package", "{@*/*}"]],
        ],
      },
    ],
  },
  {
    describe: "Less-than-clean input",
    cases: [
      {
        it: "can parse w/ whitespace after command",
        in: "please a:    @a/a",
        out: [["a", ["@a/a"]]],
      },
      {
        it: "can parse w/ whitespace  command delimiter",
        in: "please a    :    @a/a",
        out: [["a", ["@a/a"]]],
      },
      {
        it: "can parse w/ whitespace between packages",
        in: "please a:    @a/a , @b/b     ,@c/c",
        out: [["a", ["@a/a", "@b/b", "@c/c"]]],
      },
      {
        it: "can parse w/ newlines after command && between packages",
        in: "please a:\n@a/a,\n@b/b,\n@c/c",
        out: [["a", ["@a/a", "@b/b", "@c/c"]]],
      },
    ],
  },
].forEach((group) => {
  describe("Please CLI Arg Parser", () => {
    describe(group.describe, () => {
      group?.cases?.forEach((example) => {
        it(example.it, () => {
          expect(example.out).toEqual(parse(example.in));
        });
      });
    });
  });
});
