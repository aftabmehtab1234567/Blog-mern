import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Contextprovider';

const Header = () => {
  const { image } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (image) {console.log(image);
      // Fetch the image URL based on the 'image' data from your context
      // Replace '/api/getImage' with the actual endpoint to fetch the image URL
      fetch('http://localhost:8000/getImage')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
       
        })
        .then((data) => {
          setImageUrl(data.imageUrl);
        })
        
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [image]); // Only fetch the image when 'image' changes

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem('JWT');

    // Redirect to the login page after logout.
    window.location.href = '/Login'; // Replace with your actual login page URL
  };
  

  return (
    // Navbar
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <Link to="/" className="navbar-brand mt-2 mt-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </Link>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/Login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
            <li className="nav-item">
              <Link to="/Projects" className="nav-link">
                Projects
              </Link>
            </li>
          </ul>
          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Icon */}
          <a className="text-reset me-3" href="#">
            <i className="fas fa-shopping-cart"></i>
          </a>
          {/* Notifications */}
          <div className="dropdown">
            <a
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Some news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          {/* Avatar */}
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
           <img
  src={imageUrl}
  className="rounded-circle"
  height="25"
  alt="User Avatar"
  loading="lazy"
/>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
};

export default Header;
