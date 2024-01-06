import * as parser from './parser';

import { AstNode } from './ast';

type Command = string;
type Package = string;
export type Parsed = [Command, Package[]][];

export function parse(input: string) {
  try {
    const parsed: AstNode = parser.parse(input);

    const please = parsed.children[0];
    const commands = please.children;

    return commands.reduce<Parsed>((result, command) => {
      const packageList = command.children[0];
      return [
        ...result,
        [command.value, packageList.children.map((node) => node.value)],
      ];
    }, []);
  } catch (e) {
    console.log('Parse error', e);
  }

  return [];
}
