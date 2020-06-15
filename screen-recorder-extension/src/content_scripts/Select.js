class CustomSelect {

    constructor(originalSelect) {
        this.originalSelect = originalSelect;
        this.createSelectWrapper();
        this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        this.closeMenuWhenClickingOut = this.closeMenuWhenClickingOut.bind(this);
        if (this.getOriginalSelectActiveOption()) {
            this.title.textContent = this.getOriginalSelectActiveOption().textContent;
        }
        this.title.textContent = this.getOriginalSelectActiveOption() ? this.getOriginalSelectActiveOption().textContent:
            this.getOriginalSelectOptions()[0].label;
        this.title.addEventListener("click", this.toggleMenuDisplay);
        document.addEventListener("click", this.closeMenuWhenClickingOut);
        const me = this;
        this.dropdown.addEventListener("change", function () {
            me.originalSelect.value = me.title.getAttribute("value");
            me.originalSelect.dispatchEvent(new Event('change'));
        });
    }

    getOriginalSelectOptions() {
        return Array.from(this.originalSelect.querySelectorAll("option")).map(option => {
            return {"label": option.textContent, "value": option.value}
        });
    }

    updateSelectOptions() {
        // clear options
        while (this.menu.firstChild) {
            this.menu.removeChild(this.menu.lastChild);
        }
        const me = this;
        this.getOriginalSelectOptions().forEach(option => {
            var optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.textContent = option.label;
            optionElement.setAttribute("value", option.value);
            optionElement.addEventListener("click", me.handleOptionSelected);
            this.menu.append(optionElement);
        });
    }

    toggleClass(elem, className) {
        if (elem.className.indexOf(className) !== -1) {
            elem.className = elem.className.replace(className, '');
        }
        else {
            elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
        }
        return elem;
    }

    toggleMenuStyle() {
        let display = this.menu.style.display == "none" ? "" : "none";
        this.menu.style.display = display;
    }

    toggleMenuDisplay(e) {
        this.updateSelectOptions();
        this.toggleMenuStyle();
    }

    handleOptionSelected(e) {
        this.toggleMenuStyle();
        this.title.textContent = e.target.textContent;
        this.title.setAttribute("value", e.target.getAttribute("value"));
        this.originalSelect.value = e.target.getAttribute("value");

        let optionSelected = Array.from(this.originalSelect.options).filter(option => {
            return option.getAttribute("value") == e.target.getAttribute("value")
                || e.target.textContent == option.textContent;
        });
        if (this.getOriginalSelectActiveOption()) {
            this.getOriginalSelectActiveOption().removeAttribute("selected");
        }
        optionSelected[0].setAttribute("selected", "selected");
        this.dropdown.dispatchEvent(new Event('change'));
    }

    getOriginalSelectActiveOption() {
        return this.originalSelect.querySelector("option[selected]");
    }

    isMenuOpened() {
        return this.menu.style.display == "";
    }

    closeMenuWhenClickingOut(event) {
        if (event.target == this.dropdown || this.dropdown.contains(event.target)) {
            return
        }
        if (this.isMenuOpened()) {
            this.toggleMenuStyle();
        }
    }

    createSelectWrapper() {
        this.dropdown = document.createElement("div");
        this.dropdown.setAttribute("class", "dropdown");
        this.dropdown.setAttribute("widget-type",this.originalSelect.getAttribute("widget-type") ? this.originalSelect.getAttribute("widget-type"):"select");
        this.dropdown.setAttribute("data-select-id", this.originalSelect.id);
        this.dropdown.setAttribute("data-select-name", this.originalSelect.getAttribute("name"));

        this.title = document.createElement("div");
        this.title.setAttribute("class", "title pointerCursor");
        this.dropdown.appendChild(this.title);

        this.menu = document.createElement("div");
        this.menu.setAttribute("class", "menu pointerCursor");
        this.menu.style.display = "none";
        this.dropdown.appendChild(this.menu);

        this.dropdown.style.fontSize = window.getComputedStyle(this.originalSelect).getPropertyValue("font-size");
        this.dropdown.style.display = window.getComputedStyle(this.originalSelect).getPropertyValue("display");
        this.dropdown.style.fontFamily = window.getComputedStyle(this.originalSelect).getPropertyValue("font-family");
        this.dropdown.style.backgroundColor = window.getComputedStyle(this.originalSelect).getPropertyValue("background-color");
        this.dropdown.style.color = window.getComputedStyle(this.originalSelect).getPropertyValue("color");
        //this.dropdown.style.border = window.getComputedStyle(this.originalSelect).getPropertyValue("border");
        this.dropdown.style.borderRadius = window.getComputedStyle(this.originalSelect).getPropertyValue("border-radius");
        this.dropdown.style.margin = window.getComputedStyle(this.originalSelect).getPropertyValue("margin");


        this.title.style.textAlign = window.getComputedStyle(this.originalSelect).getPropertyValue("text-align");
        this.title.style.width = window.getComputedStyle(this.originalSelect).getPropertyValue("width");
        this.title.style.height = window.getComputedStyle(this.originalSelect).getPropertyValue("height");
        this.title.style.padding = window.getComputedStyle(this.originalSelect).getPropertyValue("padding");
        this.title.style.margin = window.getComputedStyle(this.originalSelect).getPropertyValue("margin");
        this.title.style.border = window.getComputedStyle(this.originalSelect).getPropertyValue("border");
        this.title.style.background = "url('https://selfrefactoring.s3.amazonaws.com/testsites/arrow-down.svg') right 10px center no-repeat";

        if (window.getComputedStyle(this.originalSelect).getPropertyValue("background-color") != "rgba(0, 0, 0, 0)") {
            this.menu.style.backgroundColor = window.getComputedStyle(this.originalSelect).getPropertyValue("background-color");
        }
        else {
            this.menu.style.backgroundColor = "#ffff";
        }
        this.menu.style.width = window.getComputedStyle(this.originalSelect).getPropertyValue("width");
        this.menu.style.color = window.getComputedStyle(this.originalSelect).getPropertyValue("color");
        this.menu.style.border = window.getComputedStyle(this.originalSelect).getPropertyValue("border");

        this.menu.style.zIndex = "9999";
        this.menu.style.position = "absolute";
        this.menu.style.borderRadius = ".4em";
        this.menu.style.overflowX = "hidden";
        this.menu.style.overflowY = "auto";
        this.menu.style.maxHeight = "300px";

        this.originalSelect.parentNode.insertBefore(this.dropdown, this.originalSelect);
        this.originalSelect.style.display = "none";
    }
}
