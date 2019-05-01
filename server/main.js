Deferrals = new Mongo.Collection('deferrals');
Instructions = new Mongo.Collection('instructions');
Lawyers = new Mongo.Collection('lawyers');

Meteor.startup(() => {

});

	//moment js templates for page display
		
	Template.registerHelper('formattedDate', function(timestamp) {
		return moment(timestamp).format('DD-MM-YYYY');    
	});
	
	Template.registerHelper('daysPast', function(timestamp){
		return moment(timestamp).fromNow(true);
	});
	
	Template.registerHelper('getOverdueDeferrals', function(){
	
		var todaysDate = new Date();
	
		return Deferrals.find({status:"Pending", due_date:{$lt:todaysDate}});
		
	});
	
	
	//GET EXPIRED UNDERTAKINGS
	Template.registerHelper('getExpiredUndertakings', function(){
		var todaysDate = new Date();
	
		return Instructions.aggregate(
		[
			{
				$match: { "undertaking_issued": "Yes", 
							"action_pending_with": { $nin: ["Closed", "Cancelled"] },
							"undertaking_end_date": {$lt: todaysDate} }
			},
			{
				$lookup: {
					"from" : "lawyers",
					"localField" : "lawyerId",
					"foreignField" : "_id",
					"as" : "lawyer"
				}
			},
			{
				$project: {
					"date":1,"lawyer.name":1,"borrower":1, "collateral":1, "update":1, "update_date":1, "action_pending_with":1, "rm":1, "undertaking_end_date":1
				}
			}
	
		]
	
		// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
	
	);
	
	});
	
	//GET UNDERTAKINGS THAT EXPIRE WITHIN 7 DAYS
	
	Template.registerHelper('getExpiringUndertakings', function(){
		var todaysDate = new Date();
		var next7Days=new Date(new Date().getTime() + 1000 * 86400 * 7);//next 7 days
	
		return Instructions.aggregate(
		[
			{
				$match: { "undertaking_issued": "Yes", 
							"action_pending_with": { $nin: ["Closed", "Cancelled"] },
							$and:[{undertaking_end_date:{$gt: todaysDate}},{undertaking_end_date:{$lte: next7Days}}]}
			},
			{
				$lookup: {
					"from" : "lawyers",
					"localField" : "lawyerId",
					"foreignField" : "_id",
					"as" : "lawyer"
				}
			},
			{
				$project: {
					"date":1,"lawyer.name":1,"borrower":1, "collateral":1, "update":1, "update_date":1, "action_pending_with":1, "rm":1, "undertaking_end_date":1
				}
			}
	
		]
	
		// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/
	
	);
});