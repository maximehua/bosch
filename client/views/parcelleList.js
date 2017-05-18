Template.parcelleList.helpers({
    parcelles: function(){
        var parcelles = Parcelles.find().fetch();
        return parcelles && parcelles;
    }
});

Template.parcelleList.onRendered(()=>{
    GAnalytics.pageview();
    GAnalytics.pageview(FlowRouter.current().path);
})
