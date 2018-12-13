accessing
metricsByTimestamp
	^ self metrics sorted: [ :older :newer | older timestamp < newer timestamp ]