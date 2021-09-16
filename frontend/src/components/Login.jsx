import React, { useRef, useState } from 'react';
import validateLogin from './validateLogin';
import { Link, Redirect } from 'react-router-dom';


function Login() {
   const [values, setValues] = useState({
      email: '',
      password: '',
   });

   const [errors, setErrors] = useState({});

   const [redirect, setRedirect] = useState(false);


   function handleFormInput(e) {
      let newdata = { ...values };
      newdata[e.target.id] = e.target.value;
      setValues(newdata);
      // console.log(newdata);
   }
   //saveToken = (token) => {
   function saveToken(token) {
      return new Promise((resolve, reject) => {
         sessionStorage.setItem('auth', token);

         resolve('Done');
      });
   }
   async function handleFormSubmit(e) {
      e.preventDefault();
      let errorsObj = validateLogin(values)
      setErrors(errorsObj);
      if (errorsObj.email || errorsObj.password) {
         console.log("validation failed!")
      } else {
         const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               Email: values.email,
               Password: values.password,
            }),
         });
         const data = await response.json();
         console.log(data);

         if (!data.error) {
            setRedirect(true)
            saveToken(data)
            console.log("Login succeeded!")

         } else {
            let errors = {}
            if (data.error == "SqliteError") {

               errors.server = 'Can not login to ur account!'


            } else if (data.error) {

               errors.server = data.message
            }

            setErrors(errors)

         }

      }
   }

   return (
      <div> {redirect && <Redirect to="/" />}
         <h1>Login</h1>
         <form onSubmit={(e) => submit(e)}>
            <div>
               <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={(e) => handleFormInput(e)}
                  id="email"
               />
               {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={(e) => handleFormInput(e)}
                  id="password"
               />
               {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
               <button onClick={handleFormSubmit}>Login</button>
            </div>
         </form>
         {errors.server && <p>{errors.server}</p>}

      </div>
   );
}

export default Login;
