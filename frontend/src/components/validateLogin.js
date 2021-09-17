function validateLogin(values) {
   let errors = {};
   if (!values.email) {
      errors.email = 'Email Is Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email adress is invalid';
   }

   if (!values.password) {
      errors.password = 'Password Is Required';
   } else {
     // errors.password = 'Wrong password';
   }
   return errors;
}

export default validateLogin;
