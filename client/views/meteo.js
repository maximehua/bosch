Template.meteo.helpers({
    parcelle: function(){
        Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));
        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        return parcelle && parcelle;
    },

    myChartData: function() {

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

            _.each(filtered, (element, index, list)=>{
                if (typeof element.values[capteur] !== "undefined") {
                    data.value.push(element.values[capteur]);
                    data.time.push(moment.utc(element.timestamp)._d);
                }

            })
            data.value.unshift('value');
            data.time.unshift('x');
            console.log(data);

            return {
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
                },
                legend: {
                    show: false,
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%HH',
                            culling: {
                                max: 4 // the number of tick texts will be adjusted to less than this value
                            }
                        }
                    },
                },
                zoom: {
                    enabled: true
                },
                // bar: {
                //     width: {
                //         ratio: 1,
                //     }
                // }
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
