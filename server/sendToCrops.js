Meteor.methods({

sendOverdueDeferralsToCrops: function(){

 SSR.compileTemplate('creditOps', Assets.getText('creditOps.html'));


//send email
    Meteor.call('sendToCrops');
},

sendToCrops:function(){
    
    this.unblock();

    Email.send({
    to:["Philemon.Wachara@nic-bank.com", "Charles.Mutungi@nic-bank.com", 
    "David.Waweru@nic-bank.com", "Josphat.Wachira@nic-bank.com", "Anthony.Njuguna@nic-bank.com"],
    from:"info@CreditOpsInfo.com",
    subject:"Overdue Deferrals",
    html:SSR.render('creditOps', {})
    });
}

});
