function validateInfo(values) {
   let errors = {};
   if (!values.firstname) {
      console.log("No First name")
      errors.firstname = 'First Name Requierd';
   }
   if (!values.lastname) {
      errors.lastname = 'Last Name Required';
   }
   if (!values.email) {
      errors.email = 'Email Is Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email adress is invalid';
   }

   if (!values.password) {
      errors.password = 'Password Is Required';
   } else if (values.password.length < 6) {
      errors.password = 'Password needs to be atleast 6 characters';
   }

   return errors;
}

export default validateInfo;
