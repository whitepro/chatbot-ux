function checkForScrollBar(){
    // const submitSec = $(".submit-section");
    // if(submitSec.length !== 0) {
    //     let submitSecHeight = submitSec.offset().top;
    //     let scrollBtnHeight = $(".scroll-btn").offset().top;
    //     if(scrollBtnHeight < submitSecHeight){
    //       return $(".scroll-btn").removeClass("hide");
    //     }
    //     $(".scroll-btn").addClass("hide");
    // }
}

function renderQuestion(component) {
  $("#botQuestions").append(component);
}

function initiateBot() {
  $.get("/bot/questions/init", function(res) {
    renderQuestion(res);
  });
}

function recordAnswer(question, answer) {
}

function fetchNextQuestion(currentQ, answer) {
  const questionnaireLength = Object.keys(questionnaireObj).length;
  //if at last question of questionnaire
  if(currentQ === questionnaireLength){
    disableQuestion(currentQ, answer);
    return initEventsDialogue();
  }
  
  $.ajax({
    url: `/bot/questions/next/${currentQ}`,
    type: "put",
    success: function(res) {
      disableQuestion(currentQ, answer);
      renderQuestion(res);
      scrollDown(currentQ +1);
    }
});
}

function displayEventsFetchMessage(){
    const message = "Finding you events!"
    let section = $("#botQuestions");
    const newElemPos = section.offset().top;
    const rowElem = $("<div>", { class: "row" });
    const divElem = $("<div>", { class: "from-them" });
    divElem.append(`<p>${message}</p>`)
    rowElem.append(divElem);
    section.append(rowElem);
    $("#botQuestions").css("marginBottom", newElemPos);
}



function disableQuestion(id, answer) {
  let section = $("#botQuestions").find("#" + id);
  const newElemPos = $(`#botQuestions`).offset().top;
  section.remove();
  if(answer){
      const rowElem = $("<div>", { class: "row" });
      const divElem = $("<div>", { class: "from-me" });
      divElem.append(`<p class="res_display">${answer}</p>`)
      rowElem.append(divElem);
      $("#botQuestions").append(rowElem);
      $("#botQuestions").css("marginBottom", newElemPos);
  }
}

function showSubmitButton() {
  $(".submitBtn").removeClass("hide");
  $(".pointer").removeClass("hide");
}

function hideSubmitButton() {
  $(".submitBtn").addClass("hide");
  $(".pointer").addClass("hide");
}

function scrollDown(id) {
  const currentHeight = $(document).height();
  const newElemPos = $(`#${id}`).offset().top;
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: newElemPos
    },
    1000
  );
  checkForScrollBar();
}

$(document).ready(function(){
    // hide scroll button when reached bottom

    /*
    =====removing temporarily for demo purposes, needs refined to avoid having the bar block areas=======

    $(window).on("scroll", function(){
        const submitSec = $(".submit-section");
        if(submitSec.length !== 0){
            const submitSecPos = $(".submit-section").offset().top;
            let scrollBtn = $(".scroll-btn").offset().top;
            if(scrollBtn > submitSecPos){
                $(".scroll-btn").addClass("hide");
            }
        }

    });

    */

    // scrolling to next position
    $(".scroll-btn").on("click", function(e) {
      e.preventDefault();
      let scrollBtnPos = $(".scroll-btn").offset().top;
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: scrollBtnPos - 200
        },
        500
      );
    });
})
