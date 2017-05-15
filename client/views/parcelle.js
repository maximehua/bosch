Template.parcelle.helpers({
    parcelle: ()=>{
        Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));
        Meteor.call("getParcellePhotos",FlowRouter.getParam("id"));
        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });

        return parcelle && parcelle;
    },
    tab : ()=>{
        var tab = {
            first : "",
            second : "",
            third : "",
        };
        if (Session.get("tab") === "first") {
            tab.first = "active";
        };
        if (Session.get("tab") === "second") {
            tab.second = "active";
        };
        if (Session.get("tab") === "third") {
            tab.third = "active";
        };
        return tab;
    },
    photo: ()=>{
        var photo = Images.find().fetch();
        return photo;
    }

});
//
Template.parcelle.onRendered(()=>{
    Meteor.setTimeout(()=>{
        $('#menu-onglet .item').tab();
        $('#stade-compteur')
        .progress({
            label: 'ratio',
            text: {
                ratio: '{left}'
            }
        });
    },100);
})
//

Template.parcelle.events({
    'click .menuTab'(event) {
        const target = event.target;
        Session.set("tab",$(target).attr('data-tab'));
    }
})
