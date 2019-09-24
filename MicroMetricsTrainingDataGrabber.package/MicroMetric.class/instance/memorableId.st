accessing
memorableId
	| memorablePart counter |
	memorablePart := self id copyUpToLast: $_.
	counter := self id copyAfterLast: $>.
	^ memorablePart , '->' , counter