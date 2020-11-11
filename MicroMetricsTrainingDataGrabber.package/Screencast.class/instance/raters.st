accessing
raters 
	^ (metrics flatCollect: [ :metric | metric raters ]) asSet