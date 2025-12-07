(identifier) @variable

((identifier) @function.method
 (#is-not? local))

[
  "fn",
  "self",
  "for",
  "while",
  "if",
  "else",
  "return",
  "continue",
  "break",
  "var",
  "const",
  "catch",
  "throw",
  "try",
  "is",
  "as",
  "in",
  "type",
  "struct",
  "has",
  "any",
  "arr",
  "select",
  "match",
  "go",
  "chan",
  "import"
] @keyword

(baseType) @type
(numberLiteral) @number

(expression (identifier) @ignore)
(identifier) @local.reference
