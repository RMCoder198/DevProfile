const isEmpty = require('./isEmpty');
const validator  = require('validator');

module.exports = function validateRegisterInput(data){
    

     data.name = !isEmpty(data.name)? data.name : '';

     data.email = !isEmpty(data.email)? data.email : '';

     data.password = !isEmpty(data.password)? data.password : '';

     data.password2 = !isEmpty(data.password2)? data.password2 : '';

	let errors = {};
	if(!validator.isLength(data.name,{min:2,max:30})){
		errors.name= 'Name must be 2 to 30 characters long';
	}
    
    	if(!validator.isLength(data.password,{min:6,max:30})){
		errors.password= 'password must be 6 to 30 characters long';
	}
    
    if(validator.isEmpty(data.name)){
    	errors.name = 'Name field is required';

    }
        if(validator.isEmpty(data.email)){
    	errors.email = 'Email field is required';

    }
           if(validator.isEmail(data.email)){
    	errors.password = 'Email is not valid';

    }
        if(validator.isEmpty(data.password)){
    	errors.password = 'password field is required';

    }
            if(validator.isEmpty(data.password2)){
    	errors.password2 = 'Confirm password field is required';

    }

    if(validator.equals(data.password,data.password2)){
    	errors.password2 = 'password must match';
    }

	return {
		errors,
		isValid:isEmpty(errors)
	}
}

