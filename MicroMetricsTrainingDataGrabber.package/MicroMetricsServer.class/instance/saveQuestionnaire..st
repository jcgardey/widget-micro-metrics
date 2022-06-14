as yet unclassified
saveQuestionnaire: request
	| body |
	body := NeoJSONReader fromString: request contents.
	(self findScreencast: (request at: #id))
		questionnaire: (body at: #questions);
		save