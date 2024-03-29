import React, { useContext, useState ,useEffect} from 'react';
import { signup, login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Contextprovider';
export default function Login() {
  const navigate=useNavigate();
  const [userData, setAccount] = useState(null);
  const [token, setToken] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const codedToken = document.cookie;
    const token=codedToken.split('=')[1]

    if (token) {
      fetch('http://localhost:8000/token-data', {
        method: 'GET',
        headers: { 
          'authorization': `Bearer ${token}`, 
        }
      })
        .then(response => {
          if (response.ok) {
            navigate('/Header')
            return response.json();
          } else {
            navigate('/login')
            throw new Error('Token verification failed');
          }
        })
        .then(data => {
          setAccount(data.user); 
        })
        .catch(error => {
          console.error('User data retrieval error:', error);
        });
    }else{
      navigate('/login')
    }
  }, []);

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

  
  const handleActions = async () => {

    try {
      if (isCreatingAccount) {
        await signup(formData);
        // Handle successful signup if needed
      } else {
        // Perform login without checking the token
        const response = await login(formData);
        setAccount(response.data)
        setToken( response.data.token)
      
        document.cookie=`jwt=${response.data.token}; expires=1h;path=/ `
        const codedToken = document.cookie;
        const token = codedToken.split("=")[1];
        console.log("token", token);
  
        if(token){
          
        navigate('/Projects');
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
