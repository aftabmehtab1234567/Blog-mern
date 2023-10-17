import React from 'react';

export default function Projects() {
  return (
    <div>
      <div
        className="bg-image d-flex justify-content-center align-items-center background"
        style={{
          backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/fluid/nature/015.webp')`,
          height: '30vh',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-white">BLOG</h1>
      </div>
      <div className="card mt-5" style={{ width: '300px', height: '400px' }}>
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light" style={{ maxWidth: '100%', height: '70%' }}>
          <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid" alt="Card Image" />
          <a href="#!">
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </div>
        <div className="card-body" style={{ height: '30%' }}>
          <h5 className="card-title">Card title</h5>
          <a href="#!" className="btn btn-primary">Button</a>
        </div>
      </div>
    </div>
  );
}
