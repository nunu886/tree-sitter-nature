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
