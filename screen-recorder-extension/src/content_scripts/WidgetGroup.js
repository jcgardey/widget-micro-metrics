class WidgetGroup {

    constructor() {
        this.elements = [];
    }

    getBoundingBox() {
        if (!this.boundingBox) {
            this.boundingBox = this.elements[0].getAbsoluteBoundingClientRect();
        }
        return this.boundingBox;
    }

    addElement(anElement) {
        if (this.elements.indexOf(anElement) == -1) {
            this.elements.push(anElement);
            this.boundingBox = this.getBoundingBox().expandWith(anElement.getAbsoluteBoundingClientRect());
        }
    }

    setMetricID(id) {
        this["data-metric-id"] = id;
    }

    getAttribute(aName) {
        return this[aName];
    }

    setAttribute(aName, value) {
        this[aName] = value
    }

    getWidgetSurroundings() {
        var padding = 20;
        return this.getBoundingBox().withPadding(padding);
    }

    getHTML() {
        let html = '';
        this.elements.map(element => {
            html += element.outerHTML;
        });
        return html;
    }

    getXPathCollection() {
        return this.elements.map(elem => elem.getXPath());
    }

    getWidgetType() {
        return this["widget-type"];
    }
}