Meteor.startup(function () {
    authi = {
        user : ()=>{
            var user = Meteor.settings.USER;
            if (typeof(user) === 'undefined')   user = process.env.USER;
            return user;
        },
        password : ()=>{
            var pass = Meteor.settings.PASSWORD;
            if (typeof(pass) === 'undefined')   pass = process.env.PASSWORD;
            return pass;
        },
    }


});


Meteor.methods({


    getParcelles : function(){

        var auth = authi.user()+":"+authi.password();
        console.log("--------");
        console.log("getParcelles");
        console.log("--------");
        console.log(auth);

        HTTP.call('GET', 'http://pa.apps.bosch-iot-cloud.com/api/v1/modules?page=0&size=100', { auth: auth },(error, result)=>{
            if (error) { console.log(error.response.statusCode); }
            else{
                var nosParcelles = [
                    "10359316077825617",
                    "10359316077825823"
                ];

                var parcelles = result.data.content.filter((d)=>{
                    return nosParcelles.indexOf(d.id) !== -1
                })


                _.each(parcelles, (element, index, list)=>{
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


        var auth = authi.user()+":"+authi.password();
        console.log("--------");
        console.log("getParcelleInfos");
        console.log("--------");

        HTTP.call('GET', 'http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/history?start=2010-01-1T10:45:27.00Z&end=2020-01-1T10:45:26.00Z', { auth: auth },(error, result)=>{
            if (error) { console.log(error.response.statusCode); }
            else{
                Parcelles.update(
                    { _id: id},{
                        $set: {
                            data : result.data
                        },
                    },
                    { upsert : true,}
                )
            }
        });
    },

    getParcellePhotos : function(id){


        var auth = authi.user()+":"+authi.password();
        console.log("--------");
        console.log("getParcellePhotos");
        console.log("--------");

        HTTP.call('GET', 'http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/images', { auth: auth },(error, result)=>{
            if (error) { console.log(error.response.statusCode); }
            else{


                var parcelle = Images.find().fetch();

                Parcelles.update(
                    { _id: id},{
                        $set: {
                            photos : result.data
                        },
                    },
                    { upsert : true,}
                );

                var newPhotos = result.data;

                if ( typeof parcelle != "undefined") {
                    readyPhotos = _.pluck(parcelle, "_id");
                    newPhotos = result.data.filter((d)=>{
                        return readyPhotos.indexOf(d.id) == -1
                    });
                }
                _.each(newPhotos, (element, index, list)=>{
                    var photo = new FS.File();
                    photo._id = element.id;
                    photo.meta = {
                        module_id : id,
                        time : element.time,
                        image_time : element.image_time,
                    }

                     photo.attachData('http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/images/' + element.id, {
                         type : "image/png",
                         auth : auth
                     },(error, result)=>{
                         if (error) { console.log(error.response.statusCode); }
                         else{

                             Images.insert(photo, function (err, fileObj) {
                                 if (err) {
                                     console.log("error");
                                     console.log(err);
                                 }
                                 else{
                                     console.log("success");
                                 }
                             });
                         }
                     })

                })
            }
        });
    },
})
