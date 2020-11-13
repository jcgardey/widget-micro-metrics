
class RadioGroup extends WidgetGroup {

    constructor(boundingBox) {
        super();
        this.boundingBox = boundingBox;
        this["widget-type"] = "radioset";
    }

    getLabel() {
        let label = '';
        this.elements.filter(elem => elem.tagName.toLowerCase() == "label").map(elem => {
            let text = elem.textContent.trim().replace(/(\r\n|\n|\r)/gm, "");
            let elementLabel = text.length > 6 ? text.substring(0,5) : text;
            label += elementLabel + " ";
        });
        return label;
    }

    getRadiosCount() {
        return this.elements.filter(elem => (elem.type == "radio" || elem.getAttribute("role") == "radio")).length;
    }


}