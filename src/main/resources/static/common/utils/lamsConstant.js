app.constant('Constant', {
	NA : "NA",
	UserType : {
		LENDER : {
			id : 1,
			value : 'Lender'
		},
		BORROWER : {
			id : 2,
			value : 'Borrower'
		},
		ALL : {
			id : -1,
			value : 'All'
		}
	},
	LoanType : {
		EXISTING_LOAN : 22,
		CLOSED_LOAN : 25,
		CURRENT_LOAN : 23
	},
	Mode : {
		ACTIVE :{
			id : 0,
			value : "Active"
		},INACTIVE :{
			id : 1,
			value : "INActive"
		},BOTH :{
			id : 2,
			value : "Both"
		}
	},
	ErrorMessage : {
		SOMETHING_WENT_WRONG : "Something Went Wrong !",
		UN_AUTHORIZED : "Unauthorized ! Please Login Again.",
		BAD_REQUEST : "Invalid Request !"
	},
	TOKEN : "TOKEN"
});