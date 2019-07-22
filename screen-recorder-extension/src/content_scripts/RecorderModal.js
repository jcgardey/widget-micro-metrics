
function RecorderModal(aScreenRecorder) {
    this.createModal();
    this.screenRecorder = aScreenRecorder;
}

RecorderModal.prototype.createModal = function () {
    const div = document.createElement("div");
    div.id = "recorder-container";
    const title = document.createElement("h3");
    title.innerHTML = "Screen Recorder";
    div.appendChild(title);

    const label = document.createElement("p");
    label.innerHTML = "Screencast Name";
    div.appendChild(label);

    this.nameInput = document.createElement("input");
    div.appendChild(this.nameInput);

    const buttonContainer = document.createElement("p");
    this.button = document.createElement("input");
    this.button.value = "Start";
    this.button.setAttribute("type", "button");
    buttonContainer.appendChild(this.button);
    div.appendChild(buttonContainer);
    div.style.display = "none";

    const me = this;
    this.button.addEventListener("click", function (event) {
        me.screenRecorder.screencastName = me.nameInput.value;
        me.hide();
        me.screenRecorder.startRecording();
    });
    document.body.appendChild(div);
};

RecorderModal.prototype.show = function () {
    document.querySelector("#recorder-container").style.display = "";
};
RecorderModal.prototype.hide = function () {
    document.querySelector("#recorder-container").style.display = "none";
};