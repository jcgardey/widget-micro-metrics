
class DateSelects extends WidgetGroup {

    constructor () {
        super();
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

}