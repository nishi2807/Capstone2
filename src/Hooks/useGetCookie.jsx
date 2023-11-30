import Cookies from "js-cookie";
import useDecrypt from "./useDecrypt";

function useGetCookie() {
  const decryptData = useDecrypt();

  const getCookie = (Key) => {
    const encrypted_result = Cookies.get(Key);

    if (encrypted_result) {
      const decrypted_result = decryptData(encrypted_result);
      console.info(`Data received from cookie ${Key}: ${decrypted_result}`); //? Remove this
      return decrypted_result;
    }
  };

  return getCookie;
}

export default useGetCookie;
