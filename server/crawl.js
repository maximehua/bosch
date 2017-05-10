Meteor.startup(function () {


});

var Future = Npm.require( 'fibers/future' );

Meteor.methods({


        getParcelles : function(){

            var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules?page=0&size=100';
            var user = Meteor.settings.USER;
            var password = Meteor.settings.PASSWORD;
            var auth = user+":"+password;

            console.log(urlquest);
            console.log("--------");

            HTTP.call('GET', urlquest, { auth: auth },(error, result)=>{
                if (error) {
                    console.log(error);
                }
                else{
                    _.each(result.data.content, (element, index, list)=>{
                        console.log(element);
                        Parcelles.update(
                            { _id: element.id},{
                                $set: {
                                    attributes : element.attributes,
                                    features : element.features,
                                },
                             },
                            { upsert : true,}
                        );
                    })
                }
            });
        },
        getParcelleInfos : function(id){

            var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/history?start=2010-01-1T10:45:27.00Z&end=2020-01-1T10:45:26.00Z';
            var user = Meteor.settings.USER;
            var password = Meteor.settings.PASSWORD;
            var auth = user+":"+password;

            console.log(urlquest);
            console.log("--------");

            HTTP.call('GET', urlquest, { auth: auth },(error, result)=>{
                if (error) {
                    console.log(error);
                }
                else{

                    Parcelles.update(
                        { _id: id},{
                            $set: {
                                data : result.data
                             },
                         },
                        { upsert : true,}
                    );

                }
            });
        },
})
