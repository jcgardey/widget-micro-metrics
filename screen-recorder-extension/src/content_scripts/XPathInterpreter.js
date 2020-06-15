/*
 * Clase principal de entrada
 */
function XPathInterpreter() {
    this.currentElement = null;
    this.xPaths = null;
    this.engine = new FullXPathEngine();

}
// setear un unico engine de busqueda de xpath
XPathInterpreter.prototype.setEngine = function(engine) {
    this.engine = engine;
    //this.engines = new array(engine);
};

// agregar un engine de busqueda de xpath a los existentes
XPathInterpreter.prototype.addEngine = function(engine) {
    this.engines.add(engine);
};

// borrar un engine de busqueda de xpaths
XPathInterpreter.prototype.removeEngine = function(engine) {
    if (this.engines.inlude(engine)){
        this.engines.remove(this.engines.indexOf(engine));
    }
};

// borrar todos los engine de busqueda de xpaths
XPathInterpreter.prototype.removeEngines = function() {
    this.engines = [];
};

XPathInterpreter.prototype.getMultipleFullPaths = function(element, parent) {
    
    var xPathArray = [];
    if(element == undefined) return;

    try{
        var path = (new FullXPathEngine()).getPath(element, document);
        if (path !== undefined && path !== null && path.length && path.length > 0){

            for (var j = 0; j < path.length; j++) {
                
                xPathArray.push(path[j]);                        
            } 
        }
    }catch(err){ console.log(err); }

    return xPathArray;
};

XPathInterpreter.prototype.getMultipleRelativeXPaths = function(element, parent, generatesSingleElemSelectors) {
    
    var xPathArray = [];
    if(element == undefined || parent == undefined)
        return;

    for (var i = 0; i < this.engine.length; i++) {

        if(this.engine[i].suitableForRelative() && (this.engine[i].generatesSingleElemSelectors() == generatesSingleElemSelectors)){
            try{
                var path = this.engine[i].getPath(element, parent);
                console.log(this.engine[i].constructor.name, path);
                if (path !== undefined && path !== null && path.length && path.length > 0){

                    for (var j = 0; j < path.length; j++) {
                        
                        xPathArray.push(path[j]);                        
                    } 
                }
            }catch(err){ console.log(err); }
        }
    };

    return xPathArray;
};


// obtener un array de xPaths correspondiente a los engines seteados
XPathInterpreter.prototype.getMultipleXPaths = function(element, parent, generatesSingleElemSelectors) {
    
    var xPathArray = [];
    if(element == undefined)
        return;

    if(parent == undefined)
        parent = element.ownerDocument;


    //var console = element.ownerDocument.defaultView.console; //.log("********************************", element, parent);
    for (var i = 0; i < this.engine.length; i++) {

        //console.log(this.engine[i].constructor.name, this.engine[i].generatesSingleElemSelectors(), generatesSingleElemSelectors);
        if(this.engine[i].generatesSingleElemSelectors() == generatesSingleElemSelectors){
            try{
                var path = this.engine[i].getPath(element, parent);
                //console.log(this.engine[i].constructor.name, path);

                if (path !== undefined && path !== null && path.length && path.length > 0){

                    for (var j = 0; j < path.length; j++) {
                        
                        if(path[j] != null && path[j].indexOf('.//')>-1){
                            xPathArray.push(path[j].slice(0,path[j].lastIndexOf("[")));
                        }
                        
                        xPathArray.push(path[j]);                        
                    } 
                }
            }catch(err){ console.log(err); }
        }
    };
    return xPathArray;
};

// obtiene un xpath unico
XPathInterpreter.prototype.getPath = function(element, parent) {
    return this.engine.getPath(element, parent);
    // return xPathArray;    
};

XPathInterpreter.prototype.getElementByXPath = function(xpath, node){
    //WARNING: I THINK THIS IS NOT PROPERLY WORKING. USE -> getSingleElementByXpath
    var doc = (node && node.ownerDocument)? node.ownerDocument : node;
    return  doc.evaluate( xpath, doc, null, 
        9, null).singleNodeValue; // 9 = FIRST_ORDERED_NODE_TYPE*/
}
XPathInterpreter.prototype.getSingleElementByXpath = function(xpath, node) {

    var doc = (node && node.ownerDocument)? node.ownerDocument : node;
    var results = doc.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null); 
    return results.iterateNext(); 
};
XPathInterpreter.prototype.getElementsByXpath = function(xpath, node) {

    var nodes = [];

    try{
        var doc = (node && node.ownerDocument)? node.ownerDocument : node;
        var results = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null); 
        var res = results.iterateNext(); 

        while (res) {
          nodes.push(res);
          res = results.iterateNext();
        }
    }catch(err){ console.log(err)}

    return nodes;
};


/* 
 * Clase strategy
 */
function XPathSelectorEngine() {
//    if ( arguments.callee.instance )    //Singleton pattern
//        return arguments.callee.instance;
//    arguments.callee.instance = this;
}

// Funcion para obtener elementos a partir de una expresion
// antiguo evaluateXpath
// recibe un nodo base o utiliza el documento
// una expresion Xpath
XPathSelectorEngine.prototype.getElement = function(aNode, aExpr) {
   
    var xpe = new aNode.defaultView.XPathEvaluator();
    var nsResolver = xpe.createNSResolver(aNode.ownerDocument === null ?
        aNode.documentElement : aNode.ownerDocument.documentElement);
    var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
    var found = [];
    var res;
    while (res = result.iterateNext())
        found.push(res);
    return found;
};
XPathSelectorEngine.prototype.suitableForRelative = function() {
   
    return false;
};
XPathSelectorEngine.prototype.generatesSingleElemSelectors = function() {
   
    return false;
};


/* 
 * Estrategia por ID directo
 * Si no lo encuentra devuelve null
 */
function BasicIdEngine() {

}


BasicIdEngine.prototype = new XPathSelectorEngine();
BasicIdEngine.prototype.constructor = BasicIdEngine;

BasicIdEngine.prototype.getPath = function(element, parent){

    if (element && element.id){
        return ['.//'+ element.nodeName.toLowerCase() +'[@id="' + element.id + '"]']; 
    }else{
        return; 
    }
};
BasicIdEngine.prototype.generatesSingleElemSelectors = function() {
   
    return true;
};




function ControlTypeBasedEngine() {

}
ControlTypeBasedEngine.prototype = new XPathSelectorEngine();
ControlTypeBasedEngine.prototype.constructor = ControlTypeBasedEngine;
ControlTypeBasedEngine.prototype.getPath = function(element, parent){

    if (!element) return;
    
    var xpaths = [];
    var tagName = element.nodeName.toLowerCase();
    var accumPathEnding = tagName;
    var traversingElem = element;

    while (traversingElem = traversingElem.parentElement){
        if(traversingElem.className){
            accumPathEnding = "*[contains(@class, 'briefCitRow')]/" + accumPathEnding;
            break;
        }
        else{
            accumPathEnding = traversingElem.nodeName.toLowerCase() + "/" + accumPathEnding;
        }
    }

    if(accumPathEnding && accumPathEnding.trim() != "*")
        xpaths.push(".//" + accumPathEnding);

    return (xpaths.length && xpaths.length > 0)? xpaths:undefined;
}

/* 
 * Función que obtiene un Xpath en relación a todos los elementos con la misma clase.
 */
function ClassXPathEngine() {

}

ClassXPathEngine.prototype = new XPathSelectorEngine();
ClassXPathEngine.prototype.constructor = ClassXPathEngine;

ClassXPathEngine.prototype.getPath = function(element, parent){

    if (!element) return;
    var elemClass = element.className;
    if (!elemClass) return;
    var tagName = element.nodeName.toLowerCase();
    
    // ESTO ES LO QUE DETERMINA COMO SERA EL XPATH -> VER VARIANTES
    var xpaths = [], elemClasses = elemClass.split(" ");

    for (var i = 0; i < elemClasses.length; i++) {

        var elemPath = ".//"+tagName+"[contains(@class, '"+ elemClasses[i] +"')]";
        var res = this.getElement(element.ownerDocument, elemPath);
        for (var e in res){
            if (res[e]==element){
                xpaths.push(elemPath);
                break;
            }
        }
    }
    return (xpaths.length && xpaths.length > 0)? xpaths:undefined;
};


/* 
 * Estrategia xpath absoluto o full.
 * Funciona como el de firebug
 */
function FullXPathEngine() {

}

FullXPathEngine.prototype = new XPathSelectorEngine();
FullXPathEngine.prototype.constructor = FullXPathEngine;

FullXPathEngine.prototype.suitableForRelative = function() {
   
    return true;
};

//Función que obtiene un Xpath según su FullPath de árbol DOM. 
FullXPathEngine.prototype.getPath = function(element, parentNode) {

    if(element == undefined || parentNode == undefined)
        return null;
    var paths = [];
    // Arma el path hasta llegar al parent node, que puede ser el parametro o "document"
    for (   ;  
            element && element.nodeType == 1 && element != parentNode; 
            element = element.parentNode) {
        var index = 1;

        // aumenta el indice para comparar con los hermanos superiores del elemento actual (del mismo tipo)
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
            if (sibling.nodeType == 10) //element.ownerDocument.defaultView.Node.DOCUMENT_TYPE_NODE
                continue;
            if (sibling.nodeName == element.nodeName)
                index++;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = "[" + (index) + "]";
        paths.splice(0, 0, tagName + pathIndex);
    }
    if(paths.length)
        return ".//" + paths.join("/");
    else return;
};

/* 
 * Estrategia CSS path (Se traduce con jquery, $('csspath')
 */
function CssPathEngine() {

}

CssPathEngine.prototype = new XPathSelectorEngine();
CssPathEngine.prototype.constructor = CssPathEngine;

//Función que obtiene un Xpath según su FullPath de árbol DOM. 
CssPathEngine.prototype.getPath = function(element, parent){
    var paths = [];

    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var selector = this.getElementCSSSelector(element);
        paths.splice(0, 0, selector);
    }

    if(paths.length)
        return paths.join(" ");
    else return;
};

//Funcion utilizada para obtener el selector de cada elemento
CssPathEngine.prototype.getElementCSSSelector = function(element){
    if (!element || !element.localName)
        return null;

    var label = element.localName.toLowerCase();
    if (element.id)
    label += "#" + element.id;

    if (element.classList && element.classList.length > 0)
    label += "." + element.classList.item(0);

    return label;
};


//Sobre escribo la funcion del padre, porque esto no es un xpath!
CssPathEngine.prototype.getElement = function(aNode, aExpr) {    
    if (aNode){
        return aNode.querySelector(aExpr);
    }else{
        return document.querySelector(aExpr);
    }

};



