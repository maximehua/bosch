Meteor.startup(function () {


});


Meteor.methods({


    getParcelles : function(){

        var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules?page=0&size=100';
        var user = Meteor.settings.USER;
        var password = Meteor.settings.PASSWORD;

        if (typeof(user) === 'undefined') {
            user = process.env.USER;
            password = process.env.PASSWORD;
            console.log(user,password);

        }


        var auth = user+":"+password;

        console.log(urlquest);
        console.log("--------");

        HTTP.call('GET', urlquest, { auth: auth },(error, result)=>{
            if (error) {
                console.log(error);
            }
            else{


                var nosParcelles = [
                    "10359316077825617",
                    "10359316077825823",
                    "10359316075863420"
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

        var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/history?start=2010-01-1T10:45:27.00Z&end=2020-01-1T10:45:26.00Z';
        var user = Meteor.settings.USER;
        var password = Meteor.settings.PASSWORD;

        if (typeof(user) === 'undefined') {
            user = process.env.USER;
            password = process.env.PASSWORD;
            console.log(user,password);

        }
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

    getParcellePhotos : function(id){

        var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/images';
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
                            photos : result.data
                        },
                    },
                    { upsert : true,}
                );

            }
        });
    },

    getParcellePhoto : function(id,photoId){

        var urlquest='http://pa.apps.bosch-iot-cloud.com/api/v1/modules/' + id + '/images/' + photoId;
        var user = Meteor.settings.USER;
        var password = Meteor.settings.PASSWORD;
        var auth = user+":"+password;

        console.log(urlquest);
        console.log("--------");


        var photo = new FS.File();
        photo.attachData(urlquest, {
            type : "image/png",
            auth : auth
        },(error, result)=>{
            if (error) {
                console.log("error");
            }
            else{
                console.log(photo.isImage());
                // photo.isImage();

                Images.insert(photo, function (err, fileObj) {
                    if (err) {
                        console.log("error");
                        console.log(err);
                    }
                    else{
                        console.log("success");
                        console.log(fileObj);

                    }
                });
            }
        })

        // HTTP.call('GET', urlquest, { auth: auth },(error, result)=>{
        //     if (error) {
        //         console.log(error);
        //     }
        //     else{
        //         console.log(result);
        //
        //
        //         Images.insert(result.data, function (err, fileObj) {
        //           // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        //         });
        //
        //     }
        // });
    },
})
