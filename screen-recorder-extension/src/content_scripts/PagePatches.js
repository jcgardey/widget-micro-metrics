// this script contains any modification that needs to be made to some pages that are going to be recorded

/**
 * H tags are replaced before recording starts because RRWeb removes them causing sometimes a layout disruption
 * when the screencast is replayed
 */
function replaceHeadingTags() {
    Array.from(document.querySelectorAll("h1,h2,h3,h4")).map(headingElement => {
       const cssText = window.getComputedStyle(headingElement).cssText;
       let newElement = document.createElement("p");
       newElement.innerHTML = headingElement.innerHTML;
       newElement.style.cssText = cssText;
       headingElement.parentNode.replaceChild(newElement, headingElement);
    });
}

/**
 * native browser's selects are replaced with a custom implementation to observe the options menu when the screencast is replayed
 */
function replaceNativeSelects() {
    let newStyleElement = document.createElement("style");
    newStyleElement.textContent = ".dropdown .menu .option{margin: .3em .3em .3em .3em;margin-top: 0.3em} .dropdown .menu .option:hover{background: rgba(0,0,0,0.2)} .pointerCursor:hover {cursor: pointer}";
    document.head.appendChild(newStyleElement);

    let selects = Array.from(document.querySelectorAll("select"));

    selects.map(originalSelect => {
        new CustomSelect(originalSelect);
    });
}

replaceNativeSelects();
replaceHeadingTags();

function modifyLinksUrls(selector, newTargetURL) {
    Array.from(document.querySelectorAll(selector)).map(link => {
       link.href = newTargetURL;
    });
}

// MAYOCLINIC
modifyLinksUrls("a[href='/forms/us-resident-appointment']", "http://selfrefactoring.s3.amazonaws.com/testsites/mayoclinic.html");

// Estancionamiento EZEIZA
modifyLinksUrls("a[href='ezeiza/Estacionamiento']", "http://selfrefactoring.s3.amazonaws.com/testsites/estacionamiento.html");

// TELEPASE
modifyLinksUrls('a[href="form-adeshion-2020.html"]', "http://selfrefactoring.s3.amazonaws.com/testsites/telepase.html");


// LACAJA
modifyLinksUrls("a[href='https://www.lacaja.com.ar/cotizadorauto']", "https://selfrefactoring.s3.amazonaws.com/testsites/lacaja.html");

