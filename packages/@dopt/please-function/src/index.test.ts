import { describe, it, expect } from "vitest";
import { please } from "./";
import { Parsed } from "@dopt/please-parser";

[
  {
    describe: "basic command generation (via dry runs)",
    cases: [
      {
        it: "generates correct commands when running a single script on single package",
        in: [["a", ["@a/a"]]],
        out: [["@a/a:a", "pnpm --filter @a/a run a"]],
      },
      {
        it: "generates correct commands when running multiple scripts on multiple package",
        in: [
          ["a", ["@a/a"]],
          ["b", ["@a/b"]],
        ],
        out: [
          ["@a/a:a", "pnpm --filter @a/a run a"],
          ["@a/b:b", "pnpm --filter @a/b run b"],
        ],
      },
      {
        it: "does not generate commands when the package lacks the specified script",
        in: [["a", ["@a/a", "@a/b"]]],
        out: [["@a/a:a", "pnpm --filter @a/a run a"]],
      },
    ],
  },
  {
    describe: "package scripts with delimiters",
    cases: [
      {
        it: "generates correct commands when running a single script on single package",
        in: [["a-a", ["@a/a"]]],
        out: [["@a/a:a-a", "pnpm --filter @a/a run a-a"]],
      },
      {
        it: "generates correct commands when running a single script on single package",
        in: [["a:a", ["@a/a"]]],
        out: [["@a/a:a:a", "pnpm --filter @a/a run a:a"]],
      },
      {
        it: "generates correct commands when running a single script on single package",
        in: [["a.a", ["@a/a"]]],
        out: [["@a/a:a.a", "pnpm --filter @a/a run a.a"]],
      },
    ],
  },
].forEach((group) => {
  describe("Programmatic usage of please()", () => {
    describe(group.describe, () => {
      group?.cases?.forEach((example) => {
        it(example.it, async () => {
          const dryRunOutput = await please(example.in as Parsed, {
            dryRun: true,
          });
          console.log("dryRunOutput", dryRunOutput);

          expect(example.out).toEqual(
            await please(example.in as Parsed, { dryRun: true })
          );
        });
      });
    });
  });
});
