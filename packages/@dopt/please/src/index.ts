#! /usr/bin/env node
import { defineCommand, runMain } from 'citty';

import { please } from '@dopt/please-function';

import { usage } from './usage';

import { name, version, description } from '../package.json';
import { parse } from '@dopt/please-parser';

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  async run({ args }) {
    try {
      const parsed = parse(`please ${args._[0]}`);
      await please(parsed);
    } catch (error) {
      console.error(error);
    }
  },
});

async function showUsage() {
  console.log(usage());
}

runMain(main, {
  showUsage,
});
