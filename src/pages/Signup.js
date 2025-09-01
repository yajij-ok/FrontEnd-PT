import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { registerUser } from '../features/user/userSlice';
import CustomInput from '../components/CustomInput';

const signUpSchema = yup.object({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  email: yup.string().nullable().required().email("Email should be valid."),
  password: yup.string().required("password is required.")
});

const SignUp = () => {

  const dispatch = useDispatch();

        const formik = useFormik({
     
          initialValues: {
     
            firstname: '',
     
            lastname: '',
     
            email: '',
            password: ''
     
          },
          validationSchema: signUpSchema,
          onSubmit: (values) => {
     
          dispatch(registerUser(values));
     
          },
     
        });
  return (
 <>
     <Meta title ="Sign Up" />
   <BreadCrumb title="signUp" />
   <div className="signUp-wrapper py-3 home-wrapper-2">
    <div className="row">
        <div className="col-12">
            <div className="auth-card">
            <div className="login-container">
        <div class="card">
            <div class="card-header">
                <h3>Sign Up</h3>
            </div>
            <div class="card-body">
                <form action="" onSubmit={formik.handleSubmit}>
                <div class="form-floating mb-3">
              <CustomInput
                        type = "text"
                  
                        label = "First Name"
                        onChng = {formik.handleChange("firstname")}
                        onBlr = {formik.handleBlur("firstname")}
                        val = {formik.values.firstname}
                        />

               </div>

              <div className="error">
                 <p className="text-danger">
                 {formik.touched.firstname && formik.errors.firstname}
                 </p>
              </div>
                    <div class="form-group pb-2">
                        <CustomInput
                        type = "text"
                       
                        label = "Last Name"
                        onChng = {formik.handleChange("lastname")}
                        onBlr = {formik.handleBlur("lastname")}
                        val = {formik.values.lastname}
                        />
                        </div>
                    <div className="error">
                    <p className="text-danger">
                   {formik.touched.lastname && formik.errors.lastname}
                   </p>
                   </div>
                    <div class="form-group pb-2">
                         <CustomInput
                        type = "email"
                       
                        label = "Email"
                        onChng = {formik.handleChange("email")}
                        onBlr = {formik.handleBlur("email")}
                        val = {formik.values.email}
                        />
                    </div>
                    <div className="error">
                    <p className="text-danger">
                   {formik.touched.email && formik.errors.email}
                   </p>     
                   </div>
                    <div class="form-group pb-2">
                         <CustomInput
                        type = "password"
                      
                        label = "Password"
                        onChng = {formik.handleChange("password")}
                        onBlr = {formik.handleBlur("password")}
                        val = {formik.values.password}
                        />
                    </div>
                    <div className="error">
                    <p className="text-danger">
                   {formik.touched.email && formik.errors.email}
                   </p>     
                   </div>
                    <button type="submit" class="btn btn-primary login-btn my-3 pb-2">Sign Up</button>
                
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

export default SignUp