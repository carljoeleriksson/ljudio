import React, { useState } from 'react';
import validateInfo from './validateInfo';
import { Link, Redirect } from 'react-router-dom';

function FormSignup() {
   const [values, setValues] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
   });

   const [errors, setErrors] = useState({});
   const [redirect, setRedirect] = useState(false);

   function handleFormInput(e) {
      let newdata = { ...values };
      newdata[e.target.id] = e.target.value;
      setValues(newdata);
      //  console.log(newdata);
   }


   async function handleFormSubmit(e) {

      e.preventDefault();

      let errorsObj = validateInfo(values)
      setErrors(errorsObj)
      console.log(errorsObj)
      if (errorsObj.firstname || errorsObj.lastname || errorsObj.email || errorsObj.password) {
         console.log("validation failed!")
      } else {
         console.log('connect to backend!')
         const res = await fetch('/api/registerMemeber', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               FirstName: values.firstname.trim(),
               LastName: values.lastname.trim(),
               Email: values.email.trim(),
               Password: values.password.trim(),
            }),
         });

         const result = await res.json()
         console.log(result)
         if (result.id) {
            console.log("Success! Redirect to login")

            setRedirect(true);


         } else {
            let errors = {}
            if (result.error == "SqliteError") {

               errors.server = 'Can not register ur account! '

               if (result.message == "UNIQUE constraint failed: Members.Email")

                  errors.server += 'U already had an account'

            } else if (result.error) {

               errors.server = result.message
            }

            setErrors(errors)

         }

      }
   }

   return (
      <div>  {redirect && <Redirect to="/login" />}
         <form onSubmit={(e) => submit(e)}>
            <h1>Create account</h1>
            <div>
               <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="Enter Your First Name"
                  onChange={(e) => handleFormInput(e)}
                  value={values.firstname}
               />

               {errors.firstname && <p>{errors.firstname}</p>}
            </div>
            <div>
               <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Enter Your Last Name"
                  onChange={(e) => handleFormInput(e)}
                  value={values.lastname}
               />
               {errors.lastname && <p>{errors.lastname}</p>}
            </div>
            <div>
               <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => handleFormInput(e)}
                  value={values.email}
               />
               {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
               <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => handleFormInput(e)}
                  value={values.password}
               />
               {errors.password && <p>{errors.password}</p>}
            </div>
            {errors.server && <p>{errors.server}</p>}
            <button onClick={handleFormSubmit}>Sign up</button>
            <span>
               Already have an account? Login <Link to="/login">Here</Link>
            </span>
         </form>
      </div>
   );
}

export default FormSignup;
