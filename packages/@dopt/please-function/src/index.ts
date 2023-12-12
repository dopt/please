import { getPackages, findWorkspaceRoot } from "./pnpm";

import { getNColors } from "./colors";

import { findMatchingPackages } from "./match";

import concurrently from "concurrently";

import { Parsed as Parameters } from "@dopt/please-parser";

type PackageName = string;
type PackageScript = string;
type Name = `${PackageName}:${PackageName}`;
type Command = `pnpm --filter ${PackageName} run ${PackageScript}`;

interface RunOptions {
  dryRun: boolean;
}

export async function please(
  parameters: Parameters,
  { dryRun = false }: RunOptions
) {
  const packages = await getPackages();
  const workspaceRoot = await findWorkspaceRoot();

  const commands: [Name, Command][] = [];

  parameters.forEach(([packageScript, targetPackages]) => {
    findMatchingPackages(packages, targetPackages).forEach(
      (matchingPackage) => {
        const { scripts = {}, name: packageName } = matchingPackage.manifest;

        if (typeof scripts[packageScript] === "string") {
          console.log("matching");
          commands.push([
            `${packageName}:${packageScript}`,
            `pnpm --filter ${packageName} run ${packageScript}`,
          ]);
        }
      }
    );
  });

  if (dryRun) {
    return commands;
  }

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
