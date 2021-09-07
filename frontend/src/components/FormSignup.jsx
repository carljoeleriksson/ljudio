import React from 'react';
import useForm from './useForm';
import validate from './validateInfo';
import { Link } from 'react-router-dom';

function FormSignup() {
   const { handleChange, values, handleSubmit, errors } = useForm(validate);
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h1>Create account</h1>
            <div>
               <label htmlFor="firstname">First Name</label>
               <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="Enter Your First Name"
                  value={values.firstname}
                  onChange={handleChange}
               />
               {errors.firstname && <p>{errors.firstname}</p>}
            </div>
            <div>
               <label htmlFor="lastname">Last name</label>
               <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Enter Your Last Name"
                  value={values.lastname}
                  onChange={handleChange}
               />
               {errors.lastname && <p>{errors.lastname}</p>}
            </div>
            <div>
               <label htmlFor="email">Email</label>
               <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={values.email}
                  onChange={handleChange}
               />
               {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={values.password}
                  onChange={handleChange}
               />
            </div>
            {errors.password && <p>{errors.password}</p>}
            <div>
               <label htmlFor="password2">Confirm password</label>
               <input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  value={values.password2}
                  onChange={handleChange}
               />
               {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button type="submit">Sign up</button>
            <span>
               Already have an account? Login <Link to="/login">Here</Link>
            </span>
         </form>
      </div>
   );
}

export default FormSignup;
