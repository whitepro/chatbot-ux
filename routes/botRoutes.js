const botController = require("../controllers/botController");

module.exports = (app) => {

    /*====== enrollment chatbot PAGE =========*/
    app.get("/bot/bloom/enrollment/demo", botController.renderEnrollmentPrefBot);

    /*====== render success message =========*/
    app.get('/bot/enroll/success', (req, res) => {
        res.render("success_message");
    })
    /*====== begin chatbot questionnaire =========*/
    app.get("/bot/questions/init", botController.enrollmentQuestionsInit);
    
    /*====== fetch next question for bot user =========*/
    app.put("/bot/questions/next/:currentSequence", botController.renderNextQ)

    /* =========== render concluding remarks ==========*/
    app.get("/bot/responses/conclude", botController.renderConcludingRemarks)

    /* =========== init events dialogue ==========*/
    app.get("/bot/events/init", botController.eventsDisplayInit);

    /* =========== render weekday event options ==========*/
    app.get("/bot/events/week/options", botController.eventsRenderWeekOptions);

    /* =========== render events for day selected ==========*/
    app.get("/bot/events/day/:id", botController.eventsFetchDay);

    // ========  render dialogue for continuing events display==========
    app.get("/bot/events/dialogue/q/continue", botController.dialogueEventsContinue)
}
