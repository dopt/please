import * as parser from "./parser";

export function parse(input: string): [string, string[]][] {
  let parsed;

  try {
    parsed = parser.parse(input);
  } catch (e) {
    console.log("Parse error", e);
  }

  const commands = parsed.children[0].children;
  //@ts-ignore
  return commands.reduce((result, command) => {
    return [
      ...result,
      [command.value, command.children.children.map((c: any) => c.value)],
    ];
  }, []);
}
