function QuestionnaireModal(id) {
  this.id = id;
}

QuestionnaireModal.prototype.show = function () {
  this.container = document.createElement('div');
  this.container.id = 'recorder-questionnaire';

  const title = document.createElement('h5');
  title.className = 'recorder-title';
  title.textContent = 'Por favor responda a las siguientes preguntas';
  title.style.textAlign = 'center';
  this.container.appendChild(title);

  this.questions = document.createElement('div');
  this.questions.style.margin = '10px';
  this.questions.appendChild(
    this.createQuestion(
      'La funcionalidad del sistema cumple con mis requerimientos',
      'question_1'
    )
  );
  this.questions.appendChild(
    this.createQuestion('Este sistema es fácil de usar', 'question_2')
  );
  this.container.appendChild(this.questions);

  this.container.appendChild(this.createSubmitButton());

  document.body.appendChild(this.container);
};

QuestionnaireModal.prototype.createQuestion = function (
  questionTitle,
  questionName
) {
  const question = document.createElement('div');
  question.style.margin = '40px 0';

  const p = document.createElement('p');
  p.className = 'recorder-question';
  p.textContent = questionTitle;
  question.appendChild(p);

  const radios = document.createElement('div');
  radios.style.margin = '10px';
  radios.innerHTML = `<span class="recorder-label">En completo desacuerdo</span>
  <input class="recorder-radio" type="radio" name="${questionName}" value="1"/>
  <input class="recorder-radio" type="radio" name="${questionName}" value="2"/>
  <input class="recorder-radio" type="radio" name="${questionName}" value="3"/>
  <input class="recorder-radio" type="radio" name="${questionName}" value="4"/>
  <input class="recorder-radio" type="radio" name="${questionName}" value="5"/>
  <span class="recorder-label">Completamente de acuerdo</span>`;
  question.appendChild(radios);
  return question;
};

QuestionnaireModal.prototype.createSubmitButton = function () {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.margin = '30px 10px';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Enviar';
  button.style.border = 'none';
  button.style.backgroundColor = '#007bff';
  button.style.color = 'white';
  button.style.padding = '6px 12px';
  button.style.borderRadius = '5px';

  const me = this;
  button.addEventListener('click', function () {
    me.sendQuestionnaire();
  });

  buttonsContainer.appendChild(button);
  return buttonsContainer;
};

QuestionnaireModal.prototype.sendQuestionnaire = function () {
  const questions = ['question_1', 'question_2'];
  if (
    questions.filter(
      (q) => document.querySelector(`input[name="${q}"]:checked`) !== null
    ).length !== questions.length
  ) {
    console.log('form invalido');
    return false;
  }
  browser.runtime.sendMessage({
    message: 'questionnaire',
    data: {
      id: this.id,
      question_1: document.querySelector('input[name="question_1"]:checked')
        .value,
      question_2: document.querySelector('input[name="question_2"]:checked')
        .value,
    },
  });
  this.remove();
};

QuestionnaireModal.prototype.remove = function () {
  this.container.parentNode.removeChild(this.container);
};

