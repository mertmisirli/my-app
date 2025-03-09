// import React from 'react';
// import { GoogleLogin } from 'react-google-login';

// const GoogleLoginButton = () => {
//   // Google client ID'niz
//   const clientId = '779815414514-s3kb76rlt3mdtuovi2bt2o6ilukh7gbv.apps.googleusercontent.com'; // Google Console'dan alacağınız client ID

//   // Google login işlemi başarılı olduğunda çalışacak fonksiyon
//   const responseGoogle = (response) => {
//     if (response.error) {
//       console.error('Google login failed:', response.error);
//     } else {
//       // Google'dan gelen id_token'ı backend'e gönderiyoruz
//       const idToken = response.tokenId;
//       loginWithGoogle(idToken);
//     }
//   };

//   // Backend'e Google login işlemi için API çağrısı yapıyoruz
//   const loginWithGoogle = (idToken) => {
//     fetch('https://localhost:7007/Users/googlelogin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         idToken: idToken, // Google'dan aldığımız id_token
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Login successful:', data);
//         // Backend'den gelen token'ı burada kullanabiliriz
//       })
//       .catch((error) => {
//         console.error('Error during Google login:', error);
//       });
//   };

//   return (
//     <div>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Google ile Giriş Yap"
//         onSuccess={responseGoogle} // Başarılı yanıt alındığında
//         onFailure={responseGoogle} // Hata yanıtı alındığında
//         cookiePolicy={'single_host_origin'}
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;