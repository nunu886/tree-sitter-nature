const PREC = {
  lowest: 0,
  logical: 1,
  comparison: 2,
  add_sub: 3,
  bitwise: 4,
  mul_div: 5,
  prefix: 6,
  call: 7,
  index_expr: 8,
  dot: 9,
};

//todo
/**
// map
// set
// arr
// as expr | is expr
*/
// //
// // EBNF to be viewd at
// //    (IPV6) https://www.bottlecaps.de/rr/ui
// //    (IPV4) https://rr.red-dove.com/ui
// //
// // Copy and paste this at one of the urls shown above in the 'Edit Grammar' tab
// // then click the 'View Diagram' tab.
// //

// /* Entry point: a program is a sequence of statements */
// start ::= stmt*

// /* Statement parsing, see parser_stmt */
// stmt ::=
//     var_begin_stmt
//   | type_begin_stmt
//   | left_param_begin_stmt
//   | throw_stmt
//   | let_stmt
//   | label_stmt
//   | expr_begin_stmt
//   | if_stmt
//   | for_stmt
//   | return_stmt
//   | import_stmt
//   | typedef_stmt
//   | continue_stmt
//   | break_stmt
//   | go_stmt
//   | match_stmt
//   | select_stmt
//   | try_catch_stmt
//   | macro_stmt

// /* Variable declaration and assignment */
// var_begin_stmt ::= "var" type (var_tuple_destr_assign | ident "=" expr)

// /* Type-based declaration and assignment */
// type_begin_stmt ::= type ident "=" expr

// /* Tuple destructure assignment on the left of stmt */
// left_param_begin_stmt ::= "(" expr ("," expr)+ ")" "=" expr | expr_begin_stmt

// /* Throw statement */
// throw_stmt ::= "throw" expr

// /* Let statement */
// let_stmt ::= "let" expr_as

// /* Label (macro) statements, e.g. @linkid, @local, etc. */
// label_stmt ::= label_token+ (typedef_stmt | fndef_stmt)

// /* Expression as a statement (assignment or call, etc) */
// expr_begin_stmt ::= expr assign_op expr | call_expr

// assign_op ::= "=" | "+=" | "-=" | "*=" | "/=" /* etc, see token_complex_assign */

// /* If statement */
// if_stmt ::= "if" expr block ("else" (if_stmt | block))?

// /* For statement (traditional, iterator, or conditional) */
// for_stmt ::= "for" (tradition_for | iterator_for | cond_for)

// tradition_for ::= stmt ";" expr ";" stmt block
// iterator_for ::= ident ("," ident)? "in" expr block
// cond_for ::= expr block

// /* Return, continue, break statements */
// return_stmt ::= "return" expr?
// continue_stmt ::= "continue"
// break_stmt ::= "break" expr?

// /* Go statement */
// go_stmt ::= "go" call_expr

// /* Match statement */
// match_stmt ::= "match" expr? block

// /* Select statement */
// select_stmt ::= "select" block

// /* Try-catch statement */
// try_catch_stmt ::= "try" block "catch" ident block

// /* Type definition (typedef) */
// typedef_stmt ::= "type" ident generics_params? impl_interfaces? "=" type_expr

// /* Macro statements (e.g. macro call as a statement) */
// macro_stmt ::= macro_expr

// /* Blocks and helpers */
// block ::= "{" stmt* "}"
// call_expr ::= expr "(" arg_list? ")"
// arg_list ::= expr ("," expr)*

// /* Variable tuple destructure assignment */
// var_tuple_destr_assign ::= "(" ident ("," ident)* ")" "=" expr

// /* Expressions (from parser_expr, precedence_expr, etc) */
// expr ::= struct_new_expr
//        | go_expr
//        | match_expr
//        | fndef_expr
//        | new_expr
//        | precedence_expr

// /* Expression as for a let statement */
// expr_as ::= expr "as" type

// /* Types */
// type ::= single_type ( "?" | "or" single_type )?

// single_type ::= "any"
//               | builtin_type
//               | "ptr" "<" type ">"
//               | "[" type ( ";" int_literal )? "]"
//               | "map" "<" type "," type ">"
//               | "set" "<" type ">"
//               | "tup" "<" type ("," type )* ">"
//               | "vec" "<" type ">"
//               | "chan" "<" type ">"
//               | "(" type ("," type )* ")"
//               | "{" type ( ":" type )? "}"
//               | "struct" "{" struct_field+ "}"
//               | "fn" params ( ":" type )? "!"
//               | ident type_args?

// /* Helpers */
// generics_params ::= "<" ident ("," ident)* ">"
// impl_interfaces ::= ":" type ("," type)*

// params ::= "(" param ("," param)* ")"
// param ::= "..."? type ident

// struct_field ::= type ident ("=" expr)?

// type_args ::= "<" type ("," type)* ">"

// return_type ::= ":" type

// precedence_expr ::= ... /* See parser_precedence_expr for full details */

// /* Terminals */
// ident ::= ... /* Identifier */
// literal_string ::= ... /* String literal */
// int_literal ::= ... /* Integer literal */
// label_token ::= ... /* Label macro, e.g. @linkid */
// macro_expr ::= ... /* Macro calls */
// builtin_type ::= "int" | "float" | "bool" | "string" | "void" | "i8" | "i16" | "i32" | "i64" | "u8" | "u16" | "u32" | "u64" | "f32" | "f64" | ... /* etc */

//https://github.com/tree-sitter/tree-sitter-go/blob/master/grammar.js
module.exports = grammar({
  name: "nature",
  extras: ($) => [/\s/],
  // externals: $ => [],
  conflicts: ($) => [
    //   [$.expression, $.baseType],
    //   [$.fnCallStmt, $.expression],
  ],
  // inline: ($) => [$.type],
  word: ($) => $.identifier,
  reserved: {
    global: ($) => [
      // "fn",
      // "self",
      // 'for',
      // 'while',
      // "if",
      // "else",
      // "return",
      // "continue",
      // "break",
      "var",
      "const",
      // 'catch',
      // 'throw',
      // 'try',
      // 'is',
      // 'as',
      // 'in',
      // "null",
      "type",
      // "struct",
      // 'has',
      // "any",
      // 'arr',
      // 'select',
      // 'match',
      // 'go',
      // 'chan',
    ],
  },

  rules: {
    source_file: ($) => repeat($.statements),
    statements: ($) =>
      choice(
        // $.funDecl,
        // $.assignmentStmt,
        // $.continueStmt,
        // $.breakStmt,
        // $.blockStmt,
        // $.returnStmt,
        $.varDecl,
        $.constDecl,
        $.typeDecl,
        // $.fnCallStmt,
        // $.ifStmt,
      ),
    // funDecl: ($) =>
    //   seq(
    //     "fn",
    //     optional(field("name", $.identifier)),
    //     "(",
    //     optional($.parameterList),
    //     ")",
    //     optional(field("result", seq(":", $.type))),
    //     field("body", $.blockStmt),
    //   ),
    varDecl: ($) =>
      seq(
        choice("var", $.type),
        field("name", $.identifier),
        seq("=", choice($.expression)),
      ),
    constDecl: ($) =>
      seq("const", field("name", $.identifier), seq("=", choice($.expression))),
    typeDecl: ($) =>
      seq(
        "type",
        field("type_name", $.identifier),
        "=",
        field("type_value", $.type),
      ),
    // exprStmt: $ => seq($.expression, ';'),
    // ifStmt: ($) =>
    //   seq(
    //     "if",
    //     "(",
    //     $.expression,
    //     ")",
    //     $.blockStmt,
    //     optional(seq("else", $.statements)),
    //   ),
    // forStmt: $ => seq('for', '(', choice($.varDecl, $.exprStmt, ';'), optional($.expression), ';', optional($.expression), ')', $.statements),
    // whileStmt: $ => seq('while', '(', $.expression, ')', $.statements),
    // blockStmt: ($) => seq("{", optional($.statements), "}"),
    // returnStmt: ($) =>
    //   prec.right(PREC.lowest, seq("return", optional($.expression))),
    // breakStmt: (_) => seq("break"),
    // continueStmt: (_) => seq("continue"),
    // fnCallStmt: ($) => $.callExpr,
    // assignmentStmt: ($) =>
    //   seq(
    //     choice(field("left", choice($.identifier, $.selectorExpr))),
    //     $.assignOp,
    //     field("right", $.expression),
    //   ),
    expression: ($) =>
      choice(
        $.identifier,
        // $.indexExpr,
        // $.callExpr,
        // $.unaryExpr,
        // $.binaryExpr,
        // $.tupleExpr,
        // $.selectorExpr,
        $.arrayLiteral,
        $.boolLiteral,
        $.numberLiteral,
        $.stringLiteral,
        $.charLiteral,
        $._null,
      ),
    // binaryExpr: ($) => {
    //   const table = [
    //     [PREC.logical, "||"],
    //     [PREC.logical, "&&"],
    //     [PREC.comparison, $.comparison],
    //     [PREC.add_sub, $.ADD_SUB],
    //     [PREC.bitwise, $.bitwise_l_r],
    //     [PREC.mul_div, $.MUL_DIV],
    //     // [PREC.index_expr, $.indexExpr],
    //     // [PREC.dot, $.selectorExpr],
    //     // [PREC.call, $.callExpr],
    //   ];
    //   return choice(
    //     ...table.map(([precedence, operator]) =>
    //       prec.left(
    //         precedence,
    //         seq(
    //           field("left", $.expression),
    //           field("operator", operator),
    //           field("right", $.expression),
    //         ),
    //       ),
    //     ),
    //   );
    // },
    // comparison: (_) => choice("==", "!=", "<", ">", "<=", ">="),
    // ADD_SUB: (_) => choice("+", "-"),
    // bitwise_l_r: (_) => choice("<<", ">>"), //bitwise (left | right)
    // MUL_DIV: (_) => choice("*", "/", "%"),
    // prefixOp: (_) => choice("-", "!", "~"),
    // assignOp: (_) => choice("=", "+=", "-=", "/=", "*=", "%=", "<<=", ">>="),
    // unaryExpr: ($) =>
    //   prec.left(
    //     PREC.prefix,
    //     seq(field("operator", $.prefixOp), field("left", $.expression)),
    //   ),
    // indexExpr: ($) =>
    //   prec.left(
    //     PREC.index_expr,
    //     seq(
    //       field("operand", $.expression),
    //       "[",
    //       field("index", $.expression),
    //       "]",
    //     ),
    //   ),
    // selectorExpr: ($) =>
    //   prec.left(
    //     PREC.dot,
    //     seq(
    //       field("operand", $.expression),
    //       seq(".", field("field", $.expression)),
    //     ),
    //   ),
    // callExpr: ($) =>
    //   prec.left(
    //     PREC.call,
    //     seq(
    //       field("function", $.identifier),
    //       "(",
    //       field("arguments", repeat($.argumentsList)),
    //       ")",
    //     ),
    //   ),
    // groupExpr: ($) => seq("(", $.expression, ")"),
    // tupleExpr: ($) =>
    //   seq(
    //     "(",
    //     repeat1(seq(choice($.expression, $.arrayLiteral), optional(","))),
    //     ")",
    //   ),
    // argumentsList: ($) => seq($.expression, optional(",")),
    // parameterList: ($) => repeat1($.parameterDecl),
    // parameterDecl: ($) =>
    //   seq(
    //     choice(
    //       seq("self", field("self", $.identifier)),
    //       seq(field("type", $.type), field("name", $.identifier)),
    //     ),
    //     optional(","),
    //   ),

    type: ($) => choice($.singleType, $.optionType, $.unionType),
    baseType: ($) =>
      choice(
        "i8",
        "i16",
        "i32",
        "int",
        "i64",
        "u8",
        "u16",
        "u32",
        "uint",
        "u64",
        "f32",
        "f64",
        "float",
        "bool",
        "any",
        $._null,
        "string",
        //
        "ptr",
        "anyptr",
        "rawptr",
        "self",
        "any",
      ),
    singleType: ($) => choice($.baseType),
    optionType: ($) => seq($.baseType, "?"),
    // structDecl: ($) =>
    //   seq(
    //     "struct",
    //     "{",
    //     seq(optional($.fieldDeclList), optional($.methodDeclList)),
    //     "}",
    //   ),
    // fieldDeclList: ($) => repeat1($.filedDecl),
    // filedDecl: ($) =>
    //   seq(
    //     field("type", $.type),
    //     field("name", $.identifier),
    //     optional(seq("=", $.expression)),
    //   ),
    // methodDeclList: ($) => repeat1($.methodDecl),
    // methodDecl: ($) =>
    //   seq(
    //     "var",
    //     field("method_name", $.identifier),
    //     "=",
    //     seq(
    //       "fn",
    //       "(",
    //       optional($.parameterList),
    //       ")",
    //       optional(field("result", seq(":", $.type))),
    //       field("body", $.blockStmt),
    //     ),
    //   ),
    // arrayType: ($) =>
    //   prec.left(
    //     PREC.lowest,
    //     seq("[", $.baseType, optional(seq(",", $.intLiteral)), "]"),
    //   ),
    // tupleType: ($) =>
    //   prec.left(
    //     PREC.lowest,
    //     seq("(", repeat1(seq($.baseType, optional(","))), ")"),
    //   ),
    unionType: ($) =>
      seq(
        choice($.singleType, $.optionType),
        repeat1(seq("|", choice($.singleType, $.optionType))),
      ), //i8?|u8|null foo = null
    numberLiteral: ($) => choice($.intLiteral, $.floatLiteral),
    intLiteral: ($) => /(\d\d*|0[0-7]*|0[xX][\da-fA-F]*)/,
    floatLiteral: ($) =>
      choice(/\d\.\d*([eE][+-]\d*)?/, /\d*[eE][+-]\d*/, /\.\d*[eE][+-]\d*/),
    boolLiteral: ($) => /(true|false)/,
    stringLiteral: ($) => choice(seq('"', /\w+/, '"'), seq("`", /\w+/, "`")),
    charLiteral: ($) => seq("'", /\w/, "'"),
    arrayLiteral: ($) =>
      seq("[", repeat1(seq($.expression, optional(","))), "]"),
    identifier: ($) => /[_a-zA-Z_]\w*/,
    comment: (_) =>
      choice(seq("//"), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
    _null: (_) => token("null"),
  },
});

function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}

function sepBy(sep, rule) {
  return optional(sepBy1(sep, rule));
}
