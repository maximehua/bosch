Template.meteo.helpers({
    parcelle: ()=>{
        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        return parcelle && parcelle;
    },
    dataName: ()=>{
        if (FlowRouter.getParam("donnee")=="Photos") {
            return "Photos"
        }
        else{
             var capteur = sensors.get(FlowRouter.getParam("donnee"));
             return  capteur.name;
        }
    },
    dataAvailable: ()=>{
        return Session.get("dataAvailable");
    },
    photo: ()=>{

        Session.set("dataAvailable",true);
        var photo = Images.find({ "meta.module_id": FlowRouter.getParam("id") }).fetch();
        console.log(photo);

        if ( typeof photo != 'undefined') {
            photo = photo.filter((d)=>{
                return moment(d.meta.time).isSame(Session.get("day"), 'day')
            })
        }
        if ( typeof photo[0]!= "undefined") {
            Session.set("dataAvailable",false);
        }
        return photo[0]
    },
    displayPhoto: ()=>{
        return FlowRouter.getParam("donnee")==="Photos";
    },
    myChartData: ()=>{

        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        if ( typeof parcelle !== "undefined") {
            console.log(Session.get("day"));
            var filtered = parcelle.data.filter((d)=>{ return moment(d.timestamp).isSame(Session.get("day"), 'day')  })
            var data = {
                value : [],
                time : [],
            };

            var capteur = sensors.get(FlowRouter.getParam("donnee"));

            Session.set("dataAvailable",true);
            _.each(filtered, (element, index, list)=>{
                if (typeof element.values[capteur.sensor] !== "undefined") {
                    data.value.push(element.values[capteur.sensor]);
                    data.time.push(moment.utc(element.timestamp)._d);
                    Session.set("dataAvailable",false);
                }

            })
            data.value.unshift('value');
            data.time.unshift('x');
            console.log(data);

            return {
                point: {
                    show: false
                },
                size: {
                    height: 600,
                },
                data: {
                    x : "x",
                    columns: [
                        data.time,
                        data.value,
                    ],
                    type: "spline",
                    colors: {
                        value: '#efb156',
                        x: '#efb156',
                    },
                    selection: {
                        draggable: true
                    }
                },
                legend: {
                    show: false,
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H h',
                            culling: {
                                max: 6 // the number of tick texts will be adjusted to less than this value
                            }
                        }
                    },
                    y:{
                        format: function (d) { return d.toFixed(2); }
                    }
                },
                tooltip: {
                    format: {
                        value: function (value, ratio, id) {
                            return value.toFixed(2)+capteur.unit;
                        }
                    }
                }
            }
        }



    }

});
//
Template.meteo.onRendered(()=>{
    Meteor.setTimeout(()=>{
        Session.set("day", moment().format('YYYY-MM-DD'));

        $('#calendar').fullCalendar({
            currentDay : Session.get("day"),
            dayClick: function(date, jsEvent, view) {
                if ( !$(jsEvent.target).hasClass("fc-future") ) {

                    $(".fc-state-highlight").removeClass("fc-state-highlight");
                    console.log($(jsEvent.target));
                    $("td[data-date="+date.format('YYYY-MM-DD')+"]").addClass("fc-state-highlight");
                    Session.set("day", date.format());

                }
            }
        })
    },100);
})



Template.meteo.onRendered(()=>{
    GAnalytics.pageview();
    GAnalytics.pageview(FlowRouter.current().path);
})

//
// Template.layout.events({
//
// })
