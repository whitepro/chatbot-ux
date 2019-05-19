function fetchConcludingRemarks(){
    $.ajax({
        url: "/bot/responses/conclude",
        type: "get",
        success: function(res, textStatus, request){
            const domId = request.getResponseHeader('domId');
            renderQuestion(res);
            scrollDown(domId);
        }
    })
}

function fetchEventsForDay(id, answer, domId) {
    $.ajax({
        url: `/bot/events/day/${id}`,
        type: "get",
        success: function(res, textStatus, request){
            const domId = request.getResponseHeader('domId');
            renderEventsDialogue(res);
            scrollDown(domId);
        }
    })
}

function initEventsDialogue(){
    // displayEventsFetchMessage();
    //setTimeout()
    $.ajax({
        url: "/bot/events/init",
        type: "get",
        success: function(res, textStatus, request){
            const domId = request.getResponseHeader('domId');
            renderEventsDialogue(res);
            scrollDown(domId);
        }
    })
}

function renderEventsDialogue(component){
    $("#botQuestions").append(component);
}

function fetchWeekOptions(){
    $.ajax({
        url: "/bot/events/week/options",
        type: "get",
        success: function(res, textStatus, request) {
            const domId = request.getResponseHeader('domId');
            renderEventsDialogue(res);
            scrollDown(domId);
        }
    })
}

function displayContinueEventsDialogueQuestion(){
    $.ajax({
        url: "/bot/events/dialogue/q/continue",
        type: "get",
        success: function(res, textStatus, request) {
            const domId = request.getResponseHeader('domId');
            renderEventsDialogue(res);
            scrollDown(domId);
        }
    })
};

function interpretAnswer({ dialogueType, answer }){
    if(dialogueType === 'continue' && answer === 'yes') return fetchWeekOptions();
    if(dialogueType === 'continue' && answer === 'no') return fetchConcludingRemarks();

}
