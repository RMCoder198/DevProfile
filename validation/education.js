 const isEmpty = require('./isEmpty');
const validator  = require('validator');

module.exports = function validateEducationInput(data){
    

   
     data.school = !isEmpty(data.school)? data.school : '';

     data.degree = !isEmpty(data.company)? data.degree : '';

     data.fieldofstudy = !isEmpty(data.fieldofstudy)? data.fieldofstudy : '';

	let errors = {};

    
            if(validator.isEmpty(data.school)){
    	errors.school = 'School field is required';

    }
    
        if(validator.isEmpty(data.degree)){
    	errors.degree = 'Degree field is required';

    }
            if(validator.isEmpty(data.fieldofstudy)){
    	errors.fieldofstudy = 'Field of study  is required';

    }
    

    

	return {
		errors,
		isValid:isEmpty(errors)
	};
};

