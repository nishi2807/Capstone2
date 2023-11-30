import CryptoJS from 'crypto-js';

function useDecrypt() {

      const decryptData = (data) => {
        try {
          const secretKey = 'capstoneproject';
    
          const decrypted = CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
          return decrypted
        } catch (error) {
          console.error('Decryption failed:', error);
        }
      };

  return decryptData;
}

export default useDecrypt;
