import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GENERATE_OTP, LOGIN_API } from "../../api/post.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [mobile,setMobile]=useState("")
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [btnText,setBtnText]=useState("Login")
  const handdleGenerateOTP = async (e) => {
    e.preventDefault();
    if(!mobile){
      return alert("Please enter mobile number")
    }

    try {
      setBtnText("Sending")
      const res = await GENERATE_OTP("+91"+mobile);

      if (res?.status) {
        setOtpSend(true);
        setBtnText("Verify")
        alert('OTP Successfully send')
      } else {
        console.log("else called");
      }
    } catch (error) {
      setBtnText("Login")

      console.log(error);
      setLoginError(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!otp){
        return alert("Please enter otp")
      }
      setBtnText("Please Wait...")

      const res = await LOGIN_API({ mobile:"+91"+mobile, otp });
      if (res?.status) {
        navigate("/home");
      } else {
        setBtnText("Login")

        alert("incorrect otp");
      }
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <div className="form-box" style={{ display: "flex", flexDirection: "column", alignItems: "center",padding:"100px",boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",borderRadius:"10px" }}>
        <div className="header-form">
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Welcome</h1>
        </div>
        <form>
          <div className="input-group" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              onChange={(e) => setMobile(e.target.value)}
              style={{ width: "300px",height:"30px",borderRadius:"5px",border:"1px solid lightgray",fontSize:"12px" }}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="OTP"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
              disabled={!otpSend}
              style={{ width: "300px",height:"30px",borderRadius:"5px",border:"1px solid lightgray",fontSize:"12px",backgroundColor:otpSend ? "white" : "lightgray" }}
            />
          </div>
            <button onClick={(e)=>  !otpSend ? handdleGenerateOTP(e) : handleSubmit(e)} type="button" style={{ width: "300px",height:"40px",borderRadius:"5px",backgroundColor:"#0D92F4",color:"white",fontSize:"15px",fontWeight:"bold",marginTop:"10px",border:"none" }}>{btnText}</button>
          
        </form>

      </div>
    </div>
  );
};

export default Login;
