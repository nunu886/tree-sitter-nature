import XCTest
import SwiftTreeSitter
import TreeSitterNature

final class TreeSitterNatureTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_nature())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Nature grammar")
    }
}
