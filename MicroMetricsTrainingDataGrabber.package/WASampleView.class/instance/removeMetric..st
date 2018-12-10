controlling
removeMetric: aMicroMetric
	| message |
	message := String
		streamContents: [ :stream | 
			stream << 'Eliminar la métrica '.
			stream << aMicroMetric id.
			stream << '? Esta acción no se puede deshacer.' ].
	(self confirm: message)
		ifTrue: [ self microMetrics remove: aMicroMetric ]