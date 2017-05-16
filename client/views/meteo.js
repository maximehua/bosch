Template.meteo.helpers({
    parcelle: ()=>{
        Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));
        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        return parcelle && parcelle;
    },
    dataName: ()=>{
        var capteur = sensors.get(FlowRouter.getParam("donnee"));
        return  capteur.name;
    },
    dataAvailable: ()=>{
        return Session.get("dataAvailable");
    },
    myChartData: ()=>{

        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        console.log(parcelle);

        if ( typeof parcelle !== "undefined") {
            console.log(Session.get("day"));
            var filtered = parcelle.data.filter((d)=>{ return moment(d.timestamp).isSame(Session.get("day"), 'day')  })
            var data = {
                value : [],
                time : [],
            };

            var capteur = sensors.get(FlowRouter.getParam("donnee"));
            console.log(capteur);

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


//
// Template.layout.onRendered(()=>{
//
// })
//
//
// Template.layout.events({
//
// })
