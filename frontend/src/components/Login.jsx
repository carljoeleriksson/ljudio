import React, { useRef, useState } from 'react';
import validate from './validateLogin';
import Axios from 'axios';
function Login() {
   const [values, setValues] = useState({
      email: '',
      password: '',
   });

   const [errors, setErrors] = useState({});

   function handleFormInput(e) {
      let newdata = { ...values };
      newdata[e.target.id] = e.target.value;
      setValues(newdata);
      console.log(newdata);
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
      setErrors(validate(values));
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

      if (data) {
         saveToken(data);
      }
   }

   // get token from session storage
   // getToken = () => {
   //    let token = null;

   //    if (sessionStorage.getItem('auth')) {
   //       token = sessionStorage.getItem('auth');
   //    }

   //    return token;
   // };

   // // delete token from session storage
   // deleteToken = () => {
   //    sessionStorage.removeItem('auth');
   // };

   // function handleFormSubmit(e) {
   //    e.preventDefault();
   //    setErrors(validate(values));
   //    Axios.post('/api/login', {
   //       headers: { authorization: 'Bearer ' + user.id },
   //       Email: values.email.trim(),
   //       Password: values.password.trim(),
   //    }).then((res) => {
   //       console.log(res);
   //    });
   // }

   return (
      <div>
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
      </div>
   );
}

export default Login;
