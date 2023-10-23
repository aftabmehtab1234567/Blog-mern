import React, { useState } from 'react';
import { signup, login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    file: null, // Add a file property to store the selected file
  });

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      
      setFormData({ ...formData, [name]: e.target.files[0] });
     
    } else {
      
   
      setFormData({ ...formData, [name]: value });
    }
  };
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };
  const handleActions = async () => {
    try {
      if (isCreatingAccount) {
        await signup(formData);
        // Handle successful signup if needed
      } else {
        const response = await login(formData);
        const { token } = response; // Assuming your API response provides a 'token' property
       console.log(response);
        if (token) {
          // Set the JWT token in a cookie
          setCookie('JWT', token, 30);
          // Navigate to the 'projects' page
          navigate('/projects');
        } else {
          // Handle login error
        }
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };
  
 // Function to set a cookie
 
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Kweesha Team</h4>
                    </div>

                    <form enctype="multipart/form-data"  >
                      <p>{isCreatingAccount ? 'Create an account' : 'Please login to your account'}</p>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Email address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="form2Example11">
                          Email address
                        </label>
                      </div>

                      {isCreatingAccount && ( // Render the file input only when creating an account
                        <div className="form-outline mb-4">
                          <input
                            type="file"
                            id="form2ExampleFile"
                            className="form-control"
                            name="file"
                       
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="form2ExampleFile">
                            Choose a file
                          </label>
                        </div>
                      )}

                      {isCreatingAccount && ( // Render the username input only when creating an account
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2ExampleUsername"
                            className="form-control"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="form2ExampleUsername">
                            Username
                          </label>
                        </div>
                      )}

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="form2Example22">
                          Password
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={handleActions}
                        >
                          {isCreatingAccount ? 'Create Account' : 'Log in'}
                        </button>
                        <a
                          className="text-muted"
                          href="#!"
                          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                        >
                          {isCreatingAccount
                            ? 'Already have an account? Log in.'
                            : "Don't have an account? Create one."}
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
