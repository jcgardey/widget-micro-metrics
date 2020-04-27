class Select {

    constructor(element, originalSelect) {
        this.dropdown = element;
        this.menu = element.querySelector(".menu");
        this.title = element.querySelector(".title");
        this.originalSelect = originalSelect;

        this.menu.style.width = window.getComputedStyle(this.title).getPropertyValue("width");
        this.toggleMenuDisplay = this.toggleMenuDisplay.bind(this);
        this.handleOptionSelected = this.handleOptionSelected.bind(this);
        if (this.getOriginalSelectActiveOption()) {
            this.title.textContent = this.getOriginalSelectActiveOption().textContent;
        }
        this.title.addEventListener("click", this.toggleMenuDisplay);
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
}
