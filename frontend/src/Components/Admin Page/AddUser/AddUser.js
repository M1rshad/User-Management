import React from 'react'
import SignupForm from '../../Signup/SignupForm'

function AddUser() {
  return (
      <SignupForm 
      endpoint="http://127.0.0.1:8000/api/signup"
      title="Create New User"
      buttonText="Create User"
      successMessage="User created successfully."
      redirectToLogin={false}  // No need to redirect to login for this page
      redirectPath="/admin-panel"  // Redirect to admin panel after successful user creation
    />
  )
}

export default AddUser
