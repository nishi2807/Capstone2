import Cookies from "js-cookie";
import useGetCookie from "./useGetCookie";
import useEncrypt from "./useEncrypt"

function useSetCookie() {
    const getCookie = useGetCookie();
    const encryptData = useEncrypt()

  const setCookie = (Key, Value) => {

    const cookie_data = getCookie(Key);

    if(!cookie_data){
      const encrypted_data = encryptData(Value);

        Cookies.set(Key, encrypted_data, { expires: 7 }); 
        console.info("Cookie created. (useSetCookie.jsx)") //? Remove this
    }else{
        console.warn("Cookie all ready exist. (useSetCookie.jsx)") //? Remove this
    }
  };

  return setCookie;
}

export default useSetCookie;
