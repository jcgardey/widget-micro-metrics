function RecorderModal(screenRecorder) {
  this.screenRecorder = screenRecorder;
  this.create();
}

RecorderModal.prototype.create = function () {
  this.div = document.createElement('div');
  this.div.id = 'recorder-container';
  this.div.className = 'rr-ignore';
  const title = document.createElement('h5');
  title.innerHTML = 'Grabando';
  this.div.id = 'recorder-container';
  this.div.appendChild(title);
  document.body.appendChild(this.div);
  this.createButtons();
  /*
  const me = this;
  this.div.addEventListener('mouseenter', function (event) {
    me.hide();
  });
  this.div.addEventListener('mouseleave', function (event) {
    me.show();
  });
  */
  this.hide();
};

RecorderModal.prototype.createButtons = function () {
  const abandon = document.createElement('button');
  abandon.textContent = 'Abandonar';
  const me = this;
  abandon.addEventListener('click', function () {
    me.screenRecorder.stopRecording(false);
    me.hide();
    new QuestionnaireModal(me.screenRecorder.id).show();
  });
  const finish = document.createElement('button');
  finish.textContent = 'Finalizar';
  finish.addEventListener('click', function () {
    me.screenRecorder.stopRecording(true);
    me.hide();
    new QuestionnaireModal(me.screenRecorder.id).show();
  });

  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'space-between';
  buttonsContainer.style.margin = '5px';
  buttonsContainer.appendChild(abandon);
  buttonsContainer.appendChild(finish);
  this.div.appendChild(buttonsContainer);
};

RecorderModal.prototype.show = function () {
  this.div.style.display = '';
};
RecorderModal.prototype.hide = function () {
  this.div.style.display = 'none';
};

