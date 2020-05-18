
class RadioGroup {

    constructor(boundingBox) {
        this.boundingBox = boundingBox;
        this.elements = [];
        this["widget-type"] = "radioset";
    }

    getAttribute(aName) {
        return this[aName];
    }

    setAttribute(aName, value) {
        this[aName] = value
    }

    getWidgetSurroundings() {
        var padding = 40;
        return this.boundingBox.withPadding(padding);
    }

    getHTML() {
        let html = '';
        this.elements.map(element => {
            html += element.outerHTML;
        });
        return html;
    }

    getLabel() {
        let label = '';
        this.elements.filter(elem => { return elem.tagName.toLowerCase() == "label"}).map(elem => {
            let text = elem.textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
            let elementLabel = text.length > 6 ? text.substring(0,5) : text;
            label += elementLabel + " ";
        });
        return label;
    }


}