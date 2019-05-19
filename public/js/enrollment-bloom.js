$(document).ready(function() {
  /*========= fetch first questions ===========*/
  initiateBot();

  /*========= SINGLESELECT answer event listener ===========*/
  $("#botQuestions").on("click", ".resp-option", function(e) {
    const dialogueType = $(this).data("type");
    const answer = $(this).data("value");
    const qid = $(this).data("qid")
    if(dialogueType === 'events'){
        const eventId = $(this).data("eventid");
        disableQuestion(qid, answer)
        return fetchEventsForDay(eventId, answer, qid);
    }
    if(dialogueType === 'continue'){
        disableQuestion(qid, answer);
        return interpretAnswer({ dialogueType, answer });
    }
    recordAnswer(qid, answer);
    return fetchNextQuestion(qid, answer);

  });

  /*========= MULTISELECT form listeners ===========*/
  $("#botQuestions").on("change paste keyup", `#form`, function(e) {
    e.preventDefault();
    const question = $(this).data('question');
    const formType = questionnaireObj[question].type;
    if(formType === 'multiselect'){
        const formCheckboxes = $("#form")[0];
        let checkedBoxes = 0;
        for (var i = 0; i < formCheckboxes.length; i++) {
          if (formCheckboxes[i].checked) checkedBoxes++;
        }
        if (checkedBoxes > 0) {
          showSubmitButton();
        }
        if (checkedBoxes === 0) {
          hideSubmitButton();
        }
    }
    if(formType === 'number'){
        // -----get value of input here, and then show button!!!!-----
        const inputValue = $(`#number-${question}`).val();
        if(inputValue){
            return showSubmitButton();
        }
        if(!inputValue){
            return hideSubmitButton();
        }
    }

  });

  $("#botQuestions").on("click", ".form-submit", function(e) {
    e.preventDefault();
    const question = $(this).data("qid");
    const formType = questionnaireObj[question].type;

    if(formType === 'multiselect'){
        const inputs = $(`#form :input:checked`);
        if(inputs.length > 0){
            let interests = [];
            inputs.each(function() {
              interests.push($(this).val());
            });
            if(interests.length > 0){
                recordAnswer(question, interests);
                fetchNextQuestion(question, interests);
            }
        }
    }
    if(formType === 'number'){
        const textAnswer = $(`#number-${question}`).val();
        if(textAnswer){
            recordAnswer(question, textAnswer);
            fetchNextQuestion(question, textAnswer);
        }
    }
  });
  /*========= END MULTISELECT form listeners ===========*/
});
