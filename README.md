To capture micro-metrics load the web-extension or paste micro-metrics.js content on the browser's console.

Depends on 
* Teapot
* NeoCSV

## Installation on Pharo 7 (Baseline coming soon)
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
Metacello new
   baseline:'Seaside3';
   repository: 'github://SeasideSt/Seaside:master/repository';
   load.
Metacello new 
	repository: 'github://pharo-nosql/voyage/mc';
	baseline: 'Voyage';
	onConflictUseLoaded;
	load: 'mongo tests'.
Metacello new
   configuration:'Bootstrap';
   repository: 'github://astares/Seaside-Bootstrap:master/src';
   version: #stable;
   load.

"Packages"
(IceRepositoryCreator new
  	url: 'git@github.com:juancruzgardey/widget-micro-metrics.git';
  	createRepository) updatePackage: #MicroMetrics.
(IceRepositoryCreator new
  	url: 'git@github.com:juancruzgardey/widget-micro-metrics.git';
  	createRepository) updatePackage: #MicroMetricsTrainingDataGrabber.
```
