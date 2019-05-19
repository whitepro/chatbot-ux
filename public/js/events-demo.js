$(document).ready(function(){
    $("#botQuestions").on("click", ".card", function(e){
        const hidden = $(this).find(".success-overlay").hasClass("hide");
        if(hidden){
            M.toast({html: 'registered!', classes: 'green'});
            return $(this).find(".success-overlay").removeClass("hide");
        }
        $(this).find(".success-overlay").addClass("hide");

    });

    $("#botQuestions").on("click", ".btn-events-done", function(){
        const qid = $(this).data("qid");
        disableQuestion(qid);
        displayContinueEventsDialogueQuestion();
    })
})
