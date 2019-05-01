
SyncedCron.config({log:true, utc:true});
//CRON JOB FOR OVERDUE DEFERRALS SENT TO RMs

SyncedCron.add({
    name:"Send Overdue Deferral to RM",
    schedule:function(parser){
      return parser.text('at 5:00 am on Tuesday and Thursday');
     
    },
    job:function(){
        
        Meteor.call('sendOverdueDeferrals');
    }
});

SyncedCron.start();

//CRON JOB FOR OVERDUE DEFERRALS SENT TO CREDIT OPS
SyncedCron.add({
    name:"Send Overdue Deferrals to Credit Ops",
    schedule:function(parser){
        return parser.text('at 5:00 am on Tuesday and Thursday');
        
    },
    job:function(){
        
        Meteor.call('sendOverdueDeferralsToCrops');
    }
} );

SyncedCron.start();

//CRON JOB FOR DEFERRALS DUE IN NEXT 7 DAYS SENT TO RM
SyncedCron.add({
    name:"Send Deferrals Due in 7 Days to RMs",
    schedule:function(parser){
        return parser.text('at 5:00 am on Monday');
        
    },
    job:function(){
        
        Meteor.call('sendDeferralsDueIn7DaysToRMs');
    }
} );


SyncedCron.start();



//CRON JOB FOR EXPIRED UNDERTAKINGS SENT TO CREDIT OPS
SyncedCron.add({
    name:"Send Expired Undertakings to Credit Ops",
    schedule:function(parser){
        return parser.text('at 5:00 am on Monday');
    
    },
    job:function(){
        
        Meteor.call('sendExpiredUndertakingsToCrops');
    }
} );

SyncedCron.start();

//CRON JOB FOR EXPIRING UNDERTAKINGS SENT TO CREDIT OPS
SyncedCron.add({
    name:"Send Expiring Undertakings to Credit Ops",
    schedule:function(parser){
        return parser.text('at 5:00 am on Monday');
    
    },
    job:function(){
        
        Meteor.call('sendExpiringUndertakingsToCrops');
    }
} );

SyncedCron.start();
