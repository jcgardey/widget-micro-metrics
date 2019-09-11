deployment
setDevelopmentResourceBaseUrl
	WAFileHandler default
	preferenceAt: #resourceBaseUrl
	put: (WAUrl absolute: ('http://localhost:', self developmentPort asString,'/files'))