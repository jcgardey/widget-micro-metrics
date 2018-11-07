controlling
downloadFile
	| filename |
	self persistAllMetrics.
	filename := self metricsFileName asFileReference.
	self requestContext
		respond: [ :response | 
			response
				contentType: WAMimeType applicationOctetStream;
				document: filename binaryReadStream contents;
				attachmentWithFileName: self metricsFileName ]