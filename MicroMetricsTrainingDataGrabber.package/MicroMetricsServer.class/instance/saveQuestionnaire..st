as yet unclassified
saveQuestionnaire: request
	| body |
	body := NeoJSONReader fromString: request contents.
	(Screencast selectOne: [ :s | s screencastName = (request at: #id) ])
		questionnaire: (body at: #questions);
		save