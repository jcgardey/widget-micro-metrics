class Select {

  constructor(element, options) {
    this.dropdown = element;
    this.menu = element.querySelector(".menu");
    this.title = element.querySelector(".title");

    this.menu.style.width = window.getComputedStyle(this.title).getPropertyValue("width");
    options.forEach(option => {
        var optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option.label;
        optionElement.setAttribute("value", option.value);
        this.menu.append(optionElement);
    });

    this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this);
    this.handleOptionSelected = this.handleOptionSelected.bind(this);


    this.options = this.dropdown.querySelectorAll('.option');
    this.addListeners();
  }

  addListeners() {
    console.log(this.title);
    this.title.addEventListener("click", this.toggleMenuDisplay);
    this.options.forEach(option => {
        option.addEventListener("click", this.handleOptionSelected);
    });
  }


  toggleClass(elem,className) {
  	if (elem.className.indexOf(className) !== -1){
  		elem.className = elem.className.replace(className,'');
  	}
  	else{
  		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
  	}
  	return elem;
  }

  toggleDisplay(elem){
  	const curDisplayStyle = elem.style.display;

  	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
  		elem.style.display = 'block';
  	}
  	else {
  		elem.style.display = 'none';
  	}
  }

  toggleMenuDisplay(e) {
  	this.toggleClass(this.menu,'hide');
  }

  handleOptionSelected(e){
  	this.toggleClass(this.menu, 'hide');

  	this.title.textContent = e.target.textContent;
  	this.title.setAttribute("value", e.target.getAttribute("value"));
  	this.title.dispatchEvent(new Event('change'));
  }
}

function replaceBuiltinSelects() {
    let selects = Array.from(document.querySelectorAll("select"));

    selects.map(originalSelect => {

        originalSelect.addEventListener("mouseenter", function () {

            let options = Array.from(originalSelect.querySelectorAll("option")).map(option => {
               return {"label": option.textContent, "value": option.value}
            });

            let newSelectContainer = document.createElement("div");
            newSelectContainer.setAttribute("class", "dropdown");

            let selectTitle = document.createElement("div");
            selectTitle.setAttribute("class", "title pointerCursor");
            selectTitle.textContent = options[0].label;
            newSelectContainer.appendChild(selectTitle);

            let selectMenu = document.createElement("div");
            selectMenu.setAttribute("class", "menu pointerCursor hide");
            newSelectContainer.appendChild(selectMenu);


            selectTitle.style.width = window.getComputedStyle(originalSelect).getPropertyValue("width");
            selectTitle.style.height = window.getComputedStyle(originalSelect).getPropertyValue("height");
            selectTitle.style.border = window.getComputedStyle(originalSelect).getPropertyValue("border");
            selectTitle.style.borderRadius = window.getComputedStyle(originalSelect).getPropertyValue("border-radius");
            selectTitle.style.background = "url('http://localhost/arrow-down.svg') right 10px center no-repeat";

            selectMenu.style.backgroundColor = "rgb(238,238,238)";
            selectMenu.style.color = "rgb(91,91,91)";
            selectMenu.style.zIndex = "9999";
            selectMenu.style.position = "absolute";
            selectMenu.style.borderRadius = ".4em";

            originalSelect.style.display = "none";
            originalSelect.parentNode.insertBefore(newSelectContainer, originalSelect);
            let newSelect = new Select(newSelectContainer, options);

            selectTitle.addEventListener("change", function () {
                originalSelect.value = selectTitle.getAttribute("value");
                originalSelect.dispatchEvent(new Event('change'));
            });

        });
    });
}
//replaceBuiltinSelects();