import React from 'react'
import Meta from '../components/meta'
import BreadCrumb from '../components/breadCrumb'
const ResetPassword = () => {
  return (
<> 
<Meta title ="Reset Password" />
<BreadCrumb title="reset-password" />
<div className="resetPassword-wrapper py-3 home-wrapper-2">
    <div className="row">
        <div className="col-12">
            <div className="auth-card">
            <div className="login-container">
        <div class="card">
            <div class="card-header">
                <h3 className="text-center">Reset Password</h3>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group pb-2">
                        <label for="password">Enter New Password</label>
                        <input type="NewPassword" id="NewPassword" name="password" class="form-control" required />
                    </div>
                    <div class="form-group pb-2">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-newPassword" name="confirm-newPassword" class="form-control" required />
                    </div>
                    <div className="d-flex gap-10 justify-content-center align-items-center">
                    <button type="submit" class="btn btn-primary login-btn my-3 pb-2">Change Password</button>
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

export default ResetPassword