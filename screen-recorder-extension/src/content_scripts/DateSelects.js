
class DateSelects extends WidgetGroup {

    constructor (aName) {
        super();
        this.name = aName;
        this["widget-type"] = "date-select";
    }

    setMetricID(id) {
        super.setMetricID(id);
        this.elements.map(element => {
            element.setMetricID(id);
        });
    }

    closestLabel() {
        return this.elements[0].closestLabel();
    }

    getTotalOptionsCount() {
        return this.elements.reduce( (total, elem) => total + elem.getOptionsCount(), 0);
    }

}