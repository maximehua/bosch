// import moment from 'moment';


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
            var filtered = parcelle.data.filter((d)=>{ return moment(d.timestamp).isSame("2017-03-22", 'day')  })
            var data = {
                value : [],
                time : [],
            };

            var capteur = sensors.get(FlowRouter.getParam("donnee"));
            console.log(capteur);

            _.each(filtered, (element, index, list)=>{
                if (typeof element.values[capteur] !== "undefined") {
                    data.value.push(element.values[capteur]);
                    data.time.push(moment.utc(element.timestamp).hours());
                }

            })
            data.value.unshift('value');
            // data.time.unshift('x');


            return {
                data: {
                    // x : "x",
                    columns: [
                        // data.time,
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
                        type: 'category',
                        categories: data.time,
                        // tick: {
                        //     culling: {
                        //         max: 4 // the number of tick texts will be adjusted to less than this value
                        //     }
                        // }
                    },
                    // y: {
                    //     tick: {
                    //         count:  8,
                    //     }
                    // }
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
    // put your options and callbacks here
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
