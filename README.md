To capture micro-metrics load the web-extension or paste micro-metrics.js content on the browser's console.

Depends on 
* Teapot
* NeoCSV

## Installation on a base Pharo 6.1 image (Baseline coming soon)
```smalltalk
"Dependencies"
Gofer it
    smalltalkhubUser: 'zeroflag' project: 'Teapot';
    configuration;
    loadStable.
Gofer it
   smalltalkhubUser: 'SvenVanCaekenberghe' project: 'Neo';
   configurationOf: 'NeoCSV';
   loadStable.

"Packages"
(IceRepositoryCreator new
  	url: 'git@github.com:juancruzgardey/widget-micro-metrics.git';
  	createRepository) updatePackage: #MicroMetrics.
(IceRepositoryCreator new
  	url: 'git@github.com:juancruzgardey/widget-micro-metrics.git';
  	createRepository) updatePackage: #MicroMetricsTrainingDataGrabber.
```
