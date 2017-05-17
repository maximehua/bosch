Template.parcelleList.helpers({
    parcelles: function(){
        var parcelles = Parcelles.find().fetch();
        return parcelles && parcelles;
    }
});
//
Template.parcelleList.onCreated(()=>{
    // Meteor.call("getParcelles");
})
//
//
// Template.layout.events({
//
// })
