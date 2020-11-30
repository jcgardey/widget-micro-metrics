accessing
addRating: anAssociation
	ratings removeAllSuchThat: [ :rating | rating key = anAssociation key].
	ratings add: anAssociation. 