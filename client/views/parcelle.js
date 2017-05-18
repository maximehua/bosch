Template.parcelle.onCreated(()=>{
    Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));
    Meteor.call("getParcellePhotos",FlowRouter.getParam("id"));
})

Template.parcelle.helpers({
    parcelle: ()=>{

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
        var photo = Images.find({ "meta.module_id": FlowRouter.getParam("id") }).fetch();
        var today = moment();
        if ( typeof photo != 'undefined') {
            photo = photo.filter((d)=>{
                return moment(d.meta.time).isSame(today, 'day')
            })
        }

        return photo[0];
    },
    remaining: ()=>{
        return 7;
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
    GAnalytics.pageview();
    GAnalytics.pageview(FlowRouter.current().path);
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
