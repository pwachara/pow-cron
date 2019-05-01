Meteor.methods({

//SEND EXPIRED UNDERTAKINGS TO CROPS
sendExpiredUndertakingsToCrops: function(){

 SSR.compileTemplate('expiredUndertakings', Assets.getText('expiredUndertakings.html'));


//send email
    Meteor.call('sendUndertakingsToCrops', false); //false means undertakings have expired already
},


//SEND EXPIRING UNDERTAKINGS WITHIN 7 DAYS TO CROPS
sendExpiringUndertakingsToCrops: function(){
    
 SSR.compileTemplate('expiringUndertakings', Assets.getText('expiringUndertakings.html'));


//send email
    Meteor.call('sendUndertakingsToCrops', true); //true means undertakings yet to expire
},


//EMAIL UNDERTAKINGS TO CROPS
sendUndertakingsToCrops:function(t){
    var myContext = '';
    var mySubject = '';

    if(t){
        myContext = 'expiringUndertakings';
        mySubject = 'Undertakings Due To Expire';
    }else{
        myContext = 'expiredUndertakings';
        mySubject = 'Expired Undertakings';

    }

    this.unblock();

    Email.send({
    to:["Philemon.Wachara@nic-bank.com", "Charles.Mutungi@nic-bank.com", 
    "David.Waweru@nic-bank.com", "Josphat.Wachira@nic-bank.com", "Anthony.Njuguna@nic-bank.com"],
    from:"info@CreditOpsInfo.com",
    subject:mySubject,
    html:SSR.render(myContext, {})
});


/**
//THIS IS FOR TEST ONLY
Email.send({
    to:["pwachara@hotmail.com", "philemonowachara@gmail.com"],
    from:"Credit_Operations@CreditOps.com",
    subject:mySubject,
    html:SSR.render(myContext, {})
});

 */

}

});