Template.parcelleList.helpers({
    parcelles: function(){
        Meteor.call("getParcelles");
        var parcelles = Parcelles.find().fetch();
        // var nosParcelles = [
        //     "10359316077825617",
        //     "10359316077825823",
        //     "10359316075863420"
        // ];
        // console.log(parcelles);
        // if (typeof parcelles !== "undefined") {
        //     parcelles = parcelles.filter((d)=>{
        //         return nosParcelles.indexOf(d._id) !== -1
        //     })
        // }
        return parcelles && parcelles;
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
