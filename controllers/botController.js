const enrollment = require("../dataJSON/enrollment-questionnaire-data.json");
const userDemoData = require("../dataJSON/user-demo-data.json")
const concludingMessages = require("../dataJSON/concludingRemarks.json");
const eventEngagementDialogue = require("../dataJSON/eventEngagements.json");
const eventsDataSample = require("../dataJSON/events-data-sample.json");

module.exports = {
  /*======= Render Enrollment Page =======*/
  renderEnrollmentPrefBot: async (req, res) => {
    //user data structure
    const user = userDemoData;
    // enrollment questionnaires => temporary enrollment JSON object
    res.render("enrollment", {
      user: user,
      main: JSON.stringify(enrollment)
    });
  },

  /*======= Render First Question =======*/
  enrollmentQuestionsInit: async (req, res) => {
    const q1 = enrollment["1"];
    const partial = q1.type;
    res.render("partials/yesno", { ...q1, layout: false });
  },

  /*======= Fetch and Render Next Question =======*/
  renderNextQ: async (req, res) => {
    const { currentSequence } = req.params;
    let seq = parseInt(currentSequence) + 1;
    const question = enrollment[seq.toString()];
    res.render(`partials/${question.type}`, { ...question, layout: false });
  },

  /*======= KEEP =======*/
  eventsDisplayInit: (req, res) => {
    //get enrollment protocol for selecting appropriate view
    const {
      id,
      question,
      question_abbr,
      type,
      domain
    } = eventEngagementDialogue.enrollment["week-options"];
    //construct data object
    const data = {
      options: eventsDataSample.weekOptions,
      id,
      question,
      question_abbr,
      type,
      domain,
      layout: false
    };
    res.append("domId", id);
    //render view for day single select
    res.render(`partials/components/${domain}/${type}`, data);
  },

  /*======= KEEP =======*/
  renderEvents: async (req, res) => {
    res.render("partials/eventCard", { layout: false, ...eventsDataSample });
  },

  /*======= KEEP =======*/
  renderConcludingRemarks: (req, res) => {
    const data = concludingMessages.thankyou;
    res.append("domId", data.id);
    res.render("partials/thankyou", {
      layout: false,
      ...data
    });
  },

  /*======= KEEP =======*/
  eventsFetchDay: async (req, res) => {
    const { id } = req.params;
    let events = {};
    //fetch events list from db group query
    eventsDataSample.weekBucket.map(elem => {
      if (elem.id == id) {
        return (events = elem);
      }
    });
    //render partial
    res.append("domId", events.id);
    res.render("partials/eventCard", { layout: false, ...events });
  },

  /*======= Render Week Day Buttons =======*/
  eventsRenderWeekOptions: (req, res) => {
    //get enrollment protocol
    const {
      id,
      question,
      question_abbr,
      type,
      domain
    } = eventEngagementDialogue.generalDialogue["week-options"];
    //construct data object
    const data = {
      options: eventsDataSample.weekOptions,
      id,
      question,
      question_abbr,
      type,
      domain,
      layout: false
    };
    res.append("domId", id);
    //render view for day single select
    res.render(`partials/components/${domain}/${type}`, {
      ...data,
      layout: false
    });
  },

  /*======= Render Question for Continuing Dialogue =======*/
  dialogueEventsContinue: (req, res) => {
    //get enrollment protocol
    const data = eventEngagementDialogue.generalDialogue.continue;
    res.append("domId", data.id);
    res.render("partials/components/events/yesno", { ...data, layout: false });
  }
};
