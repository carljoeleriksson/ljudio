import React from 'react';
import useForm from './useForm';
import validate from './validateInfo';

export default function Login() {
   const { handleChange, values, handleSubmit, errors } = useForm(validate);
   return (
      <div>
         <form onSubmit={handleSubmit}>
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
            <button type="submit" onSubmit={handleSubmit}>
               Login
            </button>
         </form>
      </div>
   );
}
