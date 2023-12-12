//@ts-ignore
export function Node(ast, type, value, children) {
  //@ts-ignore
  this.type = type;
  //@ts-ignore
  this.value = value;
  if (ast) {
    //@ts-ignore
    this.ast = true;
  }
  if (children) {
    //@ts-ignore
    this.children = children;
  }
}

//@ts-ignore
export function node(isASTNode, type, value, children) {
  //@ts-ignore
  return new Node(isASTNode, type, value, children);
}

export const types = {
  ARGUMENT: "argument",
  PACKAGE_LIST: "package-list",
  COMMAND: "command",
  SYM: "symbol",
  PACKAGE_LITERAL: "package-literal",
  PACKAGE_GLOB: "package-glob",
  ROOT: "root",
  WHITESPACE: "whitespace",
};
