package tree_sitter_nature_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_nature "github.com/tree-sitter/tree-sitter-nature/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_nature.Language())
	if language == nil {
		t.Errorf("Error loading Nature grammar")
	}
}
