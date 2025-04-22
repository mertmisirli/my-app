import React from 'react';

const Footer = () => {
  return (
    <div style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px 0',
      marginTop: '40px',
      textAlign: 'center'
    }}>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">İletişim</h2>
        <p className='email'>misirlifu@gmail.com</p>
        <a href='https://www.linkedin.com/in/furkan-mert-mısırlı'>Linkedin</a>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Footer Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <a href="#home" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none', fontSize: '16px' }}>Home</a>
          <a href="#about" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none', fontSize: '16px' }}>About</a>
          <a href="#services" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none', fontSize: '16px' }}>Services</a>
          <a href="#contact" style={{ color: '#fff', margin: '0 15px', textDecoration: 'none', fontSize: '16px' }}>Contact</a>
        </div>

        {/* Social Media Icons */}
        {/* <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <a href="#facebook" style={{ color: '#fff', margin: '0 10px', fontSize: '24px' }}><i className="fab fa-facebook"></i> Facebook</a>
          <a href="#twitter" style={{ color: '#fff', margin: '0 10px', fontSize: '24px' }}><i className="fab fa-twitter"></i> Twitter</a>
          <a href="#instagram" style={{ color: '#fff', margin: '0 10px', fontSize: '24px' }}><i className="fab fa-instagram"></i> Instagram</a>
        </div> */}

        {/* Footer Text */}
        <p style={{ fontSize: '14px', color: '#bbb' }}>
          &copy; 2024 YourCompany. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
