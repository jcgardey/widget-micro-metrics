uploaded
raterCss
	^ '
	#metricsRaterColumn{
		height:650px;
		overflow:auto;
	}
	.currentMetric{
       border: 2px solid rgb(244, 244, 52) !important;
       background: rgb(253, 255, 134) !important;
	}
	.currentMetric .panel-heading{
 	    background: rgb(230, 218, 48) !important;
	}
	.currentMetric .panel-body{
 	    background: rgb(254, 255, 217) !important;
	}
	.currentMetric .panel-body input{
		border: 1px solid rgb(187, 182, 7) !important;
	}
	.ratingTextInput, .ratingRadio{display:none}
	.ratingRadioLabel.unselected{opacity:0.4}

	.controls{margin: 30px 0}
	.controls > *{margin-right: 20px}
	.toggle{display: inline-block;}
	'