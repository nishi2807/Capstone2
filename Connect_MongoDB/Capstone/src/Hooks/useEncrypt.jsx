import CryptoJS from 'crypto-js';

function useEncrypt() {
    
    const encryptData = (data) => {
        try {
          const secretKey = 'capstoneproject';
          const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
          return encrypted
        } catch (error) {
          console.error('Encryption failed:', error);
        }
      };

  return encryptData;
}

export default useEncrypt;
