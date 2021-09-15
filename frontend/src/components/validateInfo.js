function validateInfo(values) {
   let errors = {};
   if (!values.firstname.trim('')) {
      errors.firstname = 'First Name Requierd';
   }
   if (!values.lastname.trim('')) {
      errors.lastname = 'Last Name Requierd';
   }
   if (!values.email) {
      errors.email = 'Email Is Requierd';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email adress is invalid';
   }

   if (!values.password) {
      errors.password = 'Password Is Requierd';
   } else if (values.password.length < 6) {
      errors.password = 'Password needs to be atleast 6 characters';
   } else {
      values.password !== values.password2;
      // errors.password = `Password dosen't match`;
   }

   return errors;
}

export default validateInfo;
