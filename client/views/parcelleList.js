Template.parcelleList.helpers({
    parcelles: function(){
        Meteor.call("getParcelles");
        var parcelles = Parcelles.find().fetch();

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
