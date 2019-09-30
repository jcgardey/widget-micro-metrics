rendering
renderMergeModeButtonOn: html
	| labelText |
	labelText := self mergeMode
		ifTrue: [ 'Apagar Modo Consolidación' ]
		ifFalse: [ 'Encender Modo Consolidación' ].
	html anchor
		class: 'btn btn-default';
		callback: [ self switchMergeMode ];
		with: labelText.
	self sample inConflict
		ifTrue: [ self renderConflictsCountOn: html ]