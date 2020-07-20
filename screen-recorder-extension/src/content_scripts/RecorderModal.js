
function RecorderModal() {
    this.create();
}

RecorderModal.prototype.create = function () {
    const iframe = document.createElement("iframe");
    iframe.id = "recorder-container";
    document.body.appendChild(iframe);
    this.div = document.createElement("div");
    this.div.style.width = "100%";
    this.div.style.height = "100%";
    this.div.style.backgroundColor =  "#4d4d4d";
    iframe.contentDocument.body.appendChild(this.div);
    iframe.contentDocument.body.style.margin = "0px";
    this.div.className = ".rr-ignore";
    const title = document.createElement("h5");
    title.innerHTML = "Grabando";
    title.style.color = "whitesmoke";
    title.style.fontFamily = "sans-serif";
    title.style.textAlign = "center";
    title.style.margin = "auto";

    this.div.appendChild(title);
    const me = this;
    this.div.addEventListener("mouseenter", function (event) {
        me.hide();
    });
    this.div.addEventListener("mouseleave", function (event) {
        me.show();
    });
    this.hide();
};

RecorderModal.prototype.show = function () {
    this.div.style.display = "";
};
RecorderModal.prototype.hide = function () {
    this.div.style.display = "none";
};