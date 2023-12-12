export interface Node {
  ast: boolean;
  type:
    | "argument"
    | "package-list"
    | "command"
    | "symbol"
    | "package-literal"
    | "package-glob"
    | "root"
    | "whitespace";
  value: string;
  children: Node[];
}

export class AstNode implements Node {
  ast: Node["ast"];
  type: Node["type"];
  value: Node["value"];
  children: Node[];

  constructor(
    ast: Node["ast"],
    type: Node["type"],
    value: Node["value"],
    children: Node[] = []
  ) {
    this.ast = ast;
    this.type = type;
    this.value = value;
    this.children = children;
  }

  static createNode(
    ast: Node["ast"],
    type: Node["type"],
    value: Node["value"],
    children: Node[] = []
  ): Node {
    return new AstNode(ast, type, value, children);
  }
}

export const types: Record<string, Node["type"]> = {
  ARGUMENT: "argument",
  PACKAGE_LIST: "package-list",
  COMMAND: "command",
  SYM: "symbol",
  PACKAGE_LITERAL: "package-literal",
  PACKAGE_GLOB: "package-glob",
  ROOT: "root",
  WHITESPACE: "whitespace",
};
