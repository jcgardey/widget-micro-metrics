*MicroMetricsTrainingDataGrabber
sanitizeCSV
	^ (OrderedCollection with: ',' with: Character lf asString with: Character cr asString  with: ' ' with: Character tab asString)
		inject: self
		into: [ :final :expr | final copyReplaceAll: expr with: '' ]



	"((self copyReplaceAll: ',' with: '')
		copyReplaceAll: Character lf asString
		with: '') copyReplaceAll: ' ' with: ''"