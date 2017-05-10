Template.meteo.helpers({
    parcelle: function(){
        Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));

        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        console.log(parcelle);
        return parcelle && parcelle;
    },

    myChartData: function() {
        return {
            data: {
                x : 'x',
                columns: [
                    ['data1', -30, 200, 100, 4, 150],
                    ['x', '00h', '06h', '12h', '18h', '24h'],
                ],
                type: "bar",
                colors: {
                    data1: '#efb156',
                    x: '#efb156',
                },
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        culling: {
                            max: 4 // the number of tick texts will be adjusted to less than this value
                        }
                    }
                },
                y: {
                    tick: {
                        count:  8,
                    }
                }
            },
            zoom: {
                enabled: true
            },
            bar: {
                width: {
                    ratio: 1,
                }
            }
        }
    }

});
//
// Template.layout.onRendered(()=>{
//
// })
//
//
// Template.layout.events({
//
// })
