import { useEffect, useState } from 'react'
import './App.css'

interface OTPLessUserInfo {
  status: string;
}

function App() {
  const [OTPlessSignin, setOTPlessSignin] = useState<{ initiate: any; } | undefined>(undefined);
  const [userInfo, setUserInfo] = useState('')

  const initializeSDK = () => {
    const callback = (otplessUser: OTPLessUserInfo) => {
      console.log(otplessUser);
      setUserInfo(otplessUser.status)
    }
    setOTPlessSignin(new window.OTPless(callback));
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

  const oAuth = () => {
    if (!OTPlessSignin) return;

    OTPlessSignin.initiate({
      channel: "OAUTH",
      channelType: 'WHATSAPP',
    }).then((res: any) => {
      console.log('initiate response', res)
    })
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
