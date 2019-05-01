Meteor.methods({

//SEND OVERDUE DEFERRALS TO RMS
sendOverdueDeferrals: function(){

 SSR.compileTemplate('dynamicEmail', Assets.getText('dynamicEmail.html'));

 getDeferralsData = Meteor.call('getEmailData', false);//false means overdue deferrals

 getDeferralsData.forEach(function(a){
//compose the email data.
        deferralDetail = {
        subject:"Overdue Deferral - "+a.borrower,
        deferral_date:a.deferral_date,
        rm:a.rm,
        rm_email:a.rm_email,
        borrower:a.borrower,
        item_deferred:a.item_deferred,
        authorizer:a.authorizer,
        due_date:a.due_date

    };
//send email
    Meteor.call('sendDeferrals', deferralDetail);
    
 });

},

//SEND DEFERRALS DUE WITHIN 7 DAYS TO RMS
sendDeferralsDueIn7DaysToRMs: function(){

 SSR.compileTemplate('dynamicEmail', Assets.getText('dynamicEmail.html'));

 getDeferralsData = Meteor.call('getEmailData', true);//true means up coming deferrals

 getDeferralsData.forEach(function(a){
//compose the email data.
        deferralDetail = {
        subject:"Deferral Due Soon - "+a.borrower,
        deferral_date:a.deferral_date,
        rm:a.rm,
        rm_email:a.rm_email,
        borrower:a.borrower,
        item_deferred:a.item_deferred,
        authorizer:a.authorizer,
        due_date:a.due_date

    };
//send email
    Meteor.call('sendDeferrals', deferralDetail);
    
 });

},


//THIS FUNCTION SENDS EMAIL TO EACH RM
sendDeferrals:function(emailData){
    
    this.unblock();

    Email.send({
    to:emailData.rm_email,
    from:"info@CreditOpsInfo.com",
    subject:emailData.subject,
    html:SSR.render('dynamicEmail', emailData)

    });
},

//THIS FUNCTION GETS DEFERRALS THAT ARE EXPIRED OR ABOUT TO EXPIRE WITHIN 7 DAYS
getEmailData:function(t){
    var todaysDate=new Date();
    var next7Days=new Date(new Date().getTime() + 1000 * 86400 * 7);//next 7 days

    if(t){
        //return deferrals due in the next 7 days
        return Deferrals.find({status:"Pending", $and:[{due_date:{$gt:todaysDate}}, {due_date:{$lte:next7Days}}]}).fetch();
    } else{
        //return overdue deferrals
       return Deferrals.find({status:"Pending", due_date:{$lt:todaysDate}}).fetch();
    }
    


}

});

