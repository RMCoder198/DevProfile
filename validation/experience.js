 const isEmpty = require('isEmpty');
const validator  = require('validator');

module.exports = function validateExperienceInput(data){
    

   
     data.title = !isEmpty(data.title)? data.title : '';

     data.company = !isEmpty(data.company)? data.company : '';

     data.from = !isEmpty(data.from)? data.from : '';

	let errors = {};

    
            if(validator.isEmpty(data.company)){
    	errors.company = 'Company field is required';

    }
    
        if(validator.isEmpty(data.title)){
    	errors.title = 'Title field is required';

    }
            if(validator.isEmpty(data.from)){
    	errors.From = 'From field is required';

    }
    

    }

	return {
		errors,
		isValid:isEmpty(errors)
	}
}

