$(document).ready(function(){
    $("#botQuestions").on("click", ".card-register", function(e){
        M.toast({html: 'Registered!', classes: 'green'});
    });

    $("#botQuestions").on("click", ".btn-events-done", function(){
        const qid = $(this).data("qid");
        disableQuestion(qid);
        displayContinueEventsDialogueQuestion();
    })
})
