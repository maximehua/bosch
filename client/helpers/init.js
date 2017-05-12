Meteor.startup(()=>{
    Session.setDefault("tab", "second");
    Session.setDefault("day", moment().format('YYYY-MM-DD'));
})
