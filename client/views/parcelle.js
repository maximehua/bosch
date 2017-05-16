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
    },
    gauge : ()=>{
        var dataMax = 10;
        var dataValue = 3;
        return {
            size: {
                height: 300,
            },
            data: {
                columns: [
                    ['data', dataValue]
                ],
                type: 'gauge',

            },
            gauge: {
                   label: {
                       format: function(value, ratio) {
                           return dataMax-dataValue;
                       },
                       show: false // to turn off the min/max labels.
                   },
               min: 0,
               max: dataMax,
               units: ' days',
               width: 20,
            },
            color: {
                pattern: ['#FF0000', '#F6C600', '#60B044'],
                threshold: {
                    values: [2, 5, 10]
                }
            }
        }
    }
})
//
Template.parcelle.onRendered(()=>{
    Meteor.setTimeout(()=>{
        $('#menu-onglet .item').tab();

    },100);
})
//

Template.parcelle.events({
    'click .menuTab'(event) {
        const target = event.target;
        Session.set("tab",$(target).attr('data-tab'));
    }
})
