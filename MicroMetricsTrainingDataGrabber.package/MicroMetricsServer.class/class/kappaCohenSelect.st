scripts
kappaCohenSelect
	<script>
	| metrics metricsCount disgressed disgressedCount agreed agreedCount byFirstRating bySecondRating rater1said1 rater1said2 rater1said3 rater1said4 rater2said1 rater2said2 rater2said3 rater2said4 pe1 pe2 pe3 pe4 po pe k |
	metrics := MicroMetricsServer instance cleanSelectMetrics.
	metricsCount := metrics size.
	disgressed := metrics select: [ :metric | metric raters includes: 'CONSOLIDATED' ].
	disgressedCount := disgressed size.
	agreed := metrics select: [ :metric | (metric raters includes: 'CONSOLIDATED') not ].
	agreedCount := agreed size.
	byFirstRating := metrics groupedBy: [ :metric | metric ratings first value ].
	bySecondRating := metrics groupedBy: [ :metric | metric ratings second value ].
	rater1said1 := (byFirstRating at: '1') size.
	rater1said2 := (byFirstRating at: '2') size.
	rater1said3 := (byFirstRating at: '3') size.
	rater1said4 := (byFirstRating at: '4') size.
	rater2said1 := (bySecondRating at: '1') size.
	rater2said2 := (bySecondRating at: '2') size.
	rater2said3 := (bySecondRating at: '3') size.
	rater2said4 := (bySecondRating at: '4') size.
	pe1 := (rater1said1 / metricsCount * (rater2said1 / metricsCount)) asFloat.
	pe2 := (rater1said2 / metricsCount * (rater2said2 / metricsCount)) asFloat.
	pe3 := (rater1said3 / metricsCount * (rater2said3 / metricsCount)) asFloat.
	pe4 := (rater1said4 / metricsCount * (rater2said4 / metricsCount)) asFloat.
	po := (agreedCount / metricsCount) asFloat.
	pe := pe1 + pe2 + pe3 + pe4.
	k := (po - pe) / (1 - pe).
	k inspect