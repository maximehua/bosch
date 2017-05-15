Meteor.startup(()=>{
    Session.setDefault("tab", "second");
    Session.setDefault("dataAvailable", false);
    Session.setDefault("day", moment().format('YYYY-MM-DD'));
})
