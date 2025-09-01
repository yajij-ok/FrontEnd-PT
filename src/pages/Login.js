import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Email should be valid"),
  password: yup.string().required("Password is required")
});
const Login = () => {
       const dispatch = useDispatch();
       const {isSuccess, loggedUser} = useSelector((state)=> state.auth)
       const getUser = useSelector((state)=> state.auth?.user)
       const navigate = useNavigate()
       const formik = useFormik({
      
              initialValues: {
         
                email: '',
                password: ''
         
              },
              validationSchema: loginSchema,
              onSubmit: (values) => {
         dispatch(loginUser(values))  
              },
         
            });

    if (isSuccess && loggedUser) {
      navigate(-1)
    }
   if (getUser) {
    return(
    <Profile />
    )
   } 
  return (
    <>
      <Meta title ="Log in" />
   <BreadCrumb title="log-in" />
   <div className="login-wrapper py-3 home-wrapper-2">
    <div className="row">
        <div className="col-12">
            <div className="auth-card">
            <div className="login-container">
        <div class="card">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div class="form-group">
                        <CustomInput
                        type = "email"
                        label = "Email"
                        onChng = {formik.handleChange("email")}
                        onBlr = {formik.handleBlur("email")}
                        val = {formik.values.email}
                        />

                          <div className="error text-danger mt-2">
                                 {formik.touched.email && formik.errors.email}
                        </div>
                    </div>
                    <div class="form-group">
                        <CustomInput
                        type = "password"
                        label = "Password"
                        onChng = {formik.handleChange("password")}
                        onBlr = {formik.handleBlur("password")}
                        val = {formik.values.password}
                        />
                             <div className="error text-danger mt-2">
                                {formik.touched.password && formik.errors.password}
                             </div>
                    </div>
                   <div>
                    <a href="/forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary login-btn my-3">Login</button>
                <div className="d-flex no-acc">
                    <p>Don't have an account?</p>
                    <a href="/signUp" className="px-2">Sign Up</a>
                </div>
                </form>
            </div>
            </div>
    </div>
            </div>
        </div>
    </div>
   </div>

    </>
  )
}

export default Login