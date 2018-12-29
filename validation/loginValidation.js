const isEmpty = require('isEmpty');
const validator  = require('validator');

module.exports = function validateLoginInput(data){
    

   
     data.email = !isEmpty(data.email)? data.email : '';

     data.password = !isEmpty(data.password)? data.password : '';


	let errors = {};

    
  

        if(validator.isEmpty(data.email)){
    	errors.email = 'Email field is required';

    }
           if(validator.isEmail(data.email)){
    	errors.password = 'Email is not valid';

    }
        if(validator.isEmpty(data.password)){
    	errors.password = 'password field is required';

    }

    }

	return {
		errors,
		isValid:isEmpty(errors)
	}
}

