import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
const ForgotPassword = () => {
  return (
   <>
   <Meta title ="Forgot Password" />
   <BreadCrumb title="forgot-password" />
   <div className="email-wrapper py-3 home-wrapper-2">
    <div className="row">
        <div className="col-12">
            <div className="auth-card">
            <div className="email-container">
        <div class="card">
            <div class="card-header">
                <h4 className="text-center">Reset Password!</h4>
                <p className="text-center">We will send a varification code to your E-mail</p>
            </div>
            <div class="card-body">
                <form className="d-flex flex-column gap-10">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" class="form-control" required />
                    </div>
                
                   <div className="d-flex justify-content-center flex-column gap-10 align-items-center">
                   <button type="submit" class="btn btn-primary login-btn my-3 text-center">Send Varification Code</button>
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

export default ForgotPassword