import { useEffect, useState } from 'react'
import './App.css'

interface OTPLessUserInfo {
  status: string;
}


function App() {
  const [OTPlessSignin, setOTPlessSignin] = useState<{ initiate?: any; }>({});
  const [userInfo, setUserInfo] = useState('')

  const initializeSDK = () => {
    window.otpless = (otplessUser: OTPLessUserInfo) => {
      console.log(otplessUser);
      setUserInfo(otplessUser.status)
    }
    setOTPlessSignin(new window.OTPless(window.otpless));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.src = "https://otpless.com/v2/headless.js";
    script.setAttribute("data-appid", "Q6N0L4ZKTTSV6R8OVPBA");
    script.onload = initializeSDK;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const oAuth = async () => {
    if (!OTPlessSignin) return;

    const res = await OTPlessSignin.initiate({
      channel: "OAUTH",
      channelType: 'WHATSAPP',
    })
    console.log(res)
  };


  return (
    <>
      <h1>{userInfo && userInfo}</h1>
      <button
        onClick={oAuth}
      >
        Login
      </button>
    </>
  )
}

export default App
