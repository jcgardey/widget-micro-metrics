running
testFeed
	self assert: (simple feed: {0 . 0 . 0}) equals: 0.
	self assert: (simple feed: {1 . 0 . 0}) equals: 1.
	simple weights: {1 . 2} bias: -2.
	self assert: (simple feed: {5 . 2}) equals: 1.
	"AND"
	simple weights: {1 . 1} bias: -1.5.
	self assert: (simple feed: #(0 0)) equals: 0.
	self assert: (simple feed: #(0 1)) equals: 0.
	self assert: (simple feed: #(1 0)) equals: 0.
	self assert: (simple feed: #(1 1)) equals: 1.
	"OR"
	simple weights: {1 . 1} bias: -0.5.
	self assert: (simple feed: #(0 0)) equals: 0.
	self assert: (simple feed: #(0 1)) equals: 1.
	self assert: (simple feed: #(1 0)) equals: 1.
	self assert: (simple feed: #(1 1)) equals: 1.
	"NOT"
	simple weights: {-1} bias: 0.1.
	self assert: (simple feed: #(1)) equals: 0.
	self assert: (simple feed: #(0)) equals: 1.
	"Error"
	self should: [ simple feed: { 0 . 0 } ] raise: Error