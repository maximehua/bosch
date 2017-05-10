Template.parcelle.helpers({
    parcelle: function(){
        Meteor.call("getParcelleInfos",FlowRouter.getParam("id"));
        var parcelle = Parcelles.findOne({ _id: FlowRouter.getParam("id") });
        console.log(parcelle);
        return parcelle && parcelle;
    }

});
//
Template.parcelle.onRendered(()=>{
    Meteor.setTimeout(()=>{
        $('#menu-onglet .item').tab();
        $('#stade-compteur')
          .progress({
            label: 'ratio',
            text: {
              ratio: '{left}'
            }
        });
    },100);
})
//
//
// Template.layout.events({
//
// })
