#! /usr/bin/env node
import { defineCommand, runMain } from "citty";

import { please } from "@dopt/please-function";

import { usage } from "./usage";

import { name, version, description } from "../package.json";

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  async run({ args }) {
    try {
      await please("");
    } catch (error) {
      console.error(``);
    }
  },
});

async function showUsage() {
  console.log(usage());
}

runMain(main, {
  showUsage,
});
