please 
  = a:identifier b: (_ argument)* {
    return AstNode.createNode(1, types.ROOT, text(), [
      AstNode.createNode(1, types.COMMAND, 'please', b.map(b => b[1]))
    ])
  }

argument
  = a:command b: (_ colon) c: (_ pkg_list) { 
    return AstNode.createNode(1, types.COMMAND, a.value, [c[1]]); 
  }

pkg_list 
  = a:pkg_expr b: (_ lsep _ pkg_expr)* { 
    return AstNode.createNode(1, types.PACKAGE_LIST, text(), [a, ...b.map(b => b[3])]); 
  }



lsep   "list_separator" = a:',' { return AstNode.createNode(0, types.SYM, a); }
colon  "colon"          = a:':' { return AstNode.createNode(0, types.SYM, a); }

pkg_expr
  = a:'@' scope:[a-z0-9-~][a-z0-9-._~]* b: '/' pkg:[a-z0-9-~][a-z0-9-._~]*  {
    return AstNode.createNode(1, types.PACKAGE_LITERAL, text())
  }
  / pkg:[a-z0-9-~][a-z0-9-._~]*  {
    return AstNode.createNode(1, types.PACKAGE_LITERAL, text())
  }
  / pkg_glob

pkg_glob 
  = a:'{' id:('\\}'/[^\}])* b:'}' {
    return AstNode.createNode(1, types.PACKAGE_GLOB, text())
  }

// Terminals

command 
  = a:[A-Za-z_] b:[A-Za-z_0-9-]* {
    return AstNode.createNode(1, types.COMMAND, text());
  }
  / a:'{' b:('\\}'/[^\}])* c:'}' {
    return AstNode.createNode(1, types.COMMAND, text().slice(1,-1));
  }

identifier 
  = a:[A-Za-z_] b:[A-Za-z_0-9]* {
    return AstNode.createNode(1, types.ID, text());
  }

_ "whitespace"
  = a:[ \r\n\t]* { return AstNode.createNode(0, types.WHITESPACE, ' '); }
