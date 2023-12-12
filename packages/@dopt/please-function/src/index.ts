import { getPackages, findWorkspaceRoot } from "./pnpm";

import { getNColors } from "./colors";

import { parse } from "./parse";

import { findMatchingPackages } from "./match";

import concurrently from "concurrently";

type Name = `${string}`;
type Command = `pnpm --filter ${Name} run ${string}`;

export async function please(args: string) {
  const packages = await getPackages();
  const workspaceRoot = await findWorkspaceRoot();

  const commands: [Name, Command][] = [];

  const cliArgs = parse(args);

  cliArgs.forEach(([packageScript, targetPackages]) => {
    findMatchingPackages(packages, targetPackages).forEach(
      (matchingPackage) => {
        const { scripts = {}, name: packageName } = matchingPackage.manifest;

        if (!scripts[packageScript]) {
          throw new Error(
            `MISSING_PACKAGE_SCRIPT: "${packageName}" has no ${packageScript} script`
          );
        }

        commands.push([
          `${packageName}:${packageScript}`,
          `pnpm --filter ${packageName} run ${packageScript}`,
        ]);
      }
    );
  });

  const { length } = commands
    .map((c) => c[0])
    .reduce((a, b) => (a.length > b.length ? a : b));

  const { result } = concurrently(
    commands.map(([name, command]) => ({
      command,
      name: name.padEnd(length),
    })),
    {
      cwd: workspaceRoot,
      prefix: "{name}",
      prefixColors: getNColors(commands.length),
    }
  );

  result.then(
    () => process.exit(0),
    () => process.exit(1)
  );
}
