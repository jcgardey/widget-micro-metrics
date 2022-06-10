function RecorderModal(screenRecorder) {
  this.screenRecorder = screenRecorder;
  this.create();
}

RecorderModal.prototype.create = function () {
  //const iframe = document.createElement('iframe');
  //iframe.id = 'recorder-container';
  //document.body.appendChild(iframe);
  this.div = document.createElement('div');
  this.div.id = 'recorder-container';
  this.div.className = 'rr-ignore';
  //this.div.style.width = '100%';
  //this.div.style.height = '100%';
  this.div.style.backgroundColor = '#4d4d4d';
  //iframe.contentDocument.body.appendChild(this.div);
  //iframe.contentDocument.body.style.margin = '0px';
  //iframe.className = 'rr-ignore';
  const title = document.createElement('h5');
  title.innerHTML = 'Grabando';
  title.style.color = 'whitesmoke';
  title.style.fontFamily = 'sans-serif';
  title.style.textAlign = 'center';
  title.style.margin = 'auto';

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
  });
  const finish = document.createElement('button');
  finish.textContent = 'Finalizar';
  finish.addEventListener('click', function () {
    me.screenRecorder.stopRecording(true);
    me.hide();
    new QuestionnaireModal(me.screenRecorder.screencastName).show();
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

