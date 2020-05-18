
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


}