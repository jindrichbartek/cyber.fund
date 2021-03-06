BlazeLayout.setRoot("body");

Tracker.autorun(function () {

  if (Meteor.user()) {
    Meteor.call("getUserNumber", function (err, ret) {
      Session.set("userRegistracionCount", ret);
    });
  }
});

FlowRouter.wait();
Meteor.startup(function () {
  CF.SubsMan = new SubsManager();
  CF.subs = {};
  Meteor.subscribe("userDetails", {
    onReady: function(){
      FlowRouter.initialize();
    }
  });
  Meteor.subscribe("usersCount");
  Meteor.subscribe("coinsCount");
  Meteor.subscribe("allSystems");
  Meteor.subscribe("ownAssets");
  CF._mode = Meteor.call("getEnv");
});
