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

        let newSelectContainer = document.createElement("div");
        newSelectContainer.setAttribute("class", "dropdown");
        newSelectContainer.setAttribute("widget-type","select");

        let selectTitle = document.createElement("div");
        selectTitle.setAttribute("class", "title pointerCursor");
        newSelectContainer.appendChild(selectTitle);

        let selectMenu = document.createElement("div");
        selectMenu.setAttribute("class", "menu pointerCursor");
        selectMenu.style.display = "none";
        newSelectContainer.appendChild(selectMenu);

        newSelectContainer.style.fontSize = window.getComputedStyle(originalSelect).getPropertyValue("font-size");
        newSelectContainer.style.display = window.getComputedStyle(originalSelect).getPropertyValue("display");
        newSelectContainer.style.fontFamily = window.getComputedStyle(originalSelect).getPropertyValue("font-family");
        newSelectContainer.style.backgroundColor = window.getComputedStyle(originalSelect).getPropertyValue("background-color");
        newSelectContainer.style.color = window.getComputedStyle(originalSelect).getPropertyValue("color");
        newSelectContainer.style.border = window.getComputedStyle(originalSelect).getPropertyValue("border");
        newSelectContainer.style.borderRadius = window.getComputedStyle(originalSelect).getPropertyValue("border-radius");
        newSelectContainer.style.margin = window.getComputedStyle(originalSelect).getPropertyValue("margin");


        selectTitle.style.textAlign = "center";
        selectTitle.style.width = window.getComputedStyle(originalSelect).getPropertyValue("width");
        selectTitle.style.height = window.getComputedStyle(originalSelect).getPropertyValue("height");
        selectTitle.style.padding = window.getComputedStyle(originalSelect).getPropertyValue("padding");
        selectTitle.style.background = "url('https://selfrefactoring.s3.amazonaws.com/testsites/arrow-down.svg') right 10px center no-repeat";

        if (window.getComputedStyle(originalSelect).getPropertyValue("background-color") != "rgba(0, 0, 0, 0)") {
            selectMenu.style.backgroundColor = window.getComputedStyle(originalSelect).getPropertyValue("background-color");
        }
        else {
            selectMenu.style.backgroundColor = "#ffff";
        }
        selectMenu.style.color = window.getComputedStyle(originalSelect).getPropertyValue("color");
        selectMenu.style.border = window.getComputedStyle(originalSelect).getPropertyValue("border");

        selectMenu.style.zIndex = "9999";
        selectMenu.style.position = "absolute";
        selectMenu.style.borderRadius = ".4em";
        selectMenu.style.overflowX = "hidden";
        selectMenu.style.overflowY = "auto";
        selectMenu.style.maxHeight = "300px";

        originalSelect.parentNode.insertBefore(newSelectContainer, originalSelect);
        newSelectContainer.style.display = "none";

        let newSelect = new Select(newSelectContainer, originalSelect);

        newSelectContainer.addEventListener("change", function () {
            originalSelect.value = selectTitle.getAttribute("value");
            originalSelect.dispatchEvent(new Event('change'));
        });

        originalSelect.addEventListener("mouseenter", function () {
            originalSelect.style.display = "none";
            newSelectContainer.style.display = "";
        });

        newSelectContainer.addEventListener("mouseleave", function () {
            originalSelect.style.display = "";
            newSelectContainer.style.display = "none";
        });

    });
}

replaceNativeSelects();
replaceHeadingTags();

// MAYOCLINIC
if (document.location.href == "https://www.mayoclinic.org/appointments") {
    document.querySelector(".contentbutton a").href = "http://localhost/mayoclinic.html";
}

// Estancionamiento EZEIZA
if (document.location.href.match("http://www.aa2000.com.ar/ezeiza/*") != null
    && document.querySelector("#aa2000HeaderAep_navestac").href == "http://www.aa2000.com.ar/ezeiza/Estacionamiento" ) {
    document.querySelector("#aa2000HeaderAep_navestac").href = "http://localhost/estacionamiento.html"
}

// TELEPASE
if (document.location.href.match("https://telepase.com.ar/*") != null && document.querySelector('a[href="adhesion-con-tarjeta.html"]') ) {
    console.log("Entra");
    document.querySelector('a[href="adhesion-con-tarjeta.html"]').href = "http://localhost/telepase.html"
}
