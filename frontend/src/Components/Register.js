import React, { useEffect, useState } from "react";
// import the css file
import "./Register.css";
import image from "../StaticImages/download.png";

function Register() {
  // here we will create the state...........
  let [imageUser, setImageUser] = useState(null);
  let [mobileOTP, setMobileOTP] = useState("");
  let arrayOTP;
  const [registerData, setRegisterData] = useState({
    ProfileImage: "",
    Email: "",
    Name: "",
    Password: "",
    MobileNumber: "",
  });

  // here we sill set the image tag to the image that user will selected for its profile............
  function ImageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      document.getElementById("profileImage").style.border = "none";
      setImageUser(URL.createObjectURL(event.target.files[0]));
    }
  }

  // mobile otp entered functionsality  here...............
  function mobileOtpEntered(event) {
    try {
      if (event.target.value == "") {
        return;
      } else {
        var checkValueExist = mobileOTP.charAt(Number(event.target.id));
        if (checkValueExist != 0) {
          var newOTP = mobileOTP.replace(
            mobileOTP[checkValueExist],
            event.target.value
          );
          setMobileOTP(newOTP);
          // checking the remaining block which is missed ..........................
          for (let i = checkValueExist; i < arrayOTP.length; i++) {
            if (arrayOTP[i].value == "") {
              arrayOTP[i].focus();
              break;
            }
          }
        } else {
          setMobileOTP(mobileOTP.concat(event.target.value));
          arrayOTP[Number(event.target.id) + 1].focus();
        }
      }
    } catch {
      console.log("It is just for code not break");
    }
  }

  function toggleOtpModel(value) {
    document.getElementById("OTPModel").style.display = value;
  }

  // this is used to save the user data ............
  function saveUserData() {
    debugger;
    if (validationInput()) {
      return;
    } else {
      
    }
  }

  useEffect(() => {
    arrayOTP = document.getElementsByClassName("mobileOTPClass");
  });

  // here we will validate the data
  function validationInput() {
    // this switch case for apply all the required validation on all elements
    var error = false;
    console.log(registerData);
    if (registerData.ProfileImage === "") {
      document.getElementById("profileImage").style.border = "1px solid red";
      error = true;
    }
    if (registerData.Email === "") {
      document.getElementById("email").style.color = "red";
      error = true;
    }
    if (registerData.Name === "") {
      document.getElementById("name").style.color = "red";
      error = true;
    }
    if (registerData.Password === "") {
      document.getElementById("password").style.color = "red";
      error = true;
    }
    if (registerData.MobileNumber === "") {
      document.getElementById("mobileNumber").style.color = "red";
      error = true;
    }
    return error;
  }

  return (
    <>
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="w-1/3 border p-4 bg-gray-500 rounded shadow-md ">
          <div className="">
            <p className=" text-3xl font-serif text-center text-white">
              Create an Account
            </p>
          </div>
          <div>
            {/* Here we will get the user profile  */}
            <div className="px-5 mt-2">
              <div className="UserProfile">
                <label htmlFor="Image" className="rounded-full w-full">
                  <img
                    id="profileImage"
                    src={imageUser == null ? image : imageUser}
                    className="rounded-full m-auto h-36 w-36"
                    title="Select an Image or photo"
                    alt="Select an image"
                  />
                </label>
                <input
                  id="Image"
                  accept="image/jpg, image/jpeg , image/png"
                  type="file"
                  className="FileChoosen"
                  onChange={(event) => {
                    ImageSelected(event);
                  }}
                />
              </div>
            </div>
            <div className="px-5 mt-2">
              <div className="Email">
                <label
                  id="email"
                  className="required block text-white text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  onChange={(event)=>{
                    if(event.target.value.length == 0){
                      document.getElementById("email").style.color = "red"
                    }
                    else{
                      if(event.target.value.includes("@")== 0){
                        document.getElementById("showEmail").style.display = 'block';
                      }
                      document.getElementById("email").style.color = "white";
                      setRegisterData({...registerData,[event.target.name]:event.target.value});
                      if(event.target.value.includes("@")!= 0){
                        document.getElementById("showEmail").style.display = 'none';
                      }
                    }
                  }}
                />
        <p style={{display:'none'}} id="showEmail" className="text-red-300">Please enter a valid email</p>

              </div>
            </div>
            <div className="px-5 mt-2">
              <div className="Email">
                <label
                  id="name"
                  className="required block text-white text-sm font-medium mb-2"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name="Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  onChange={(event)=>{
                    if(event.target.value.length == 0){
                      document.getElementById("name").style.color = "red";
                    }
                    else{
                      document.getElementById("showName").style.display = 'block';
                      document.getElementById("name").style.color = "white";
                      setRegisterData({...registerData,[event.target.name]:event.target.value});
                      if(event.target.value.length >4){
                        document.getElementById("showName").style.display = 'none';
                      }
                    }
                  }}
                />
              <p style={{display:'none'}} id="showName" className="text-red-300">Please enter the user name 4 characters long</p>
              </div>
            </div>
            <div className="px-5 mt-2">
              <div className="password">
                <label
                  id="password"
                  className="required block text-white text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  onChange={(event)=>{
                    if(event.target.value.length == 0){
                      document.getElementById("password").style.color = "red";
                    }
                    else{
                      document.getElementById("showPassword").style.display = 'block';
                      document.getElementById("password").style.color = "white";
                      setRegisterData({...registerData,[event.target.name]:event.target.value});
                      if(event.target.value.length >6){
                        document.getElementById("showPassword").style.display = 'none';
                      }
                    }
                  }}
                />
                <p style={{display:'none'}} id="showPassword" className="text-red-300">Please enter the password 6 characters long</p>
              </div>
            </div>
            <div className="px-5 mt-2">
              <div className="MobileNumber">
                <label
                  id="mobileNumber"
                  className="required block text-white text-sm font-medium mb-2"
                >
                  Mobile Number
                </label>
                <div className="flex flex-row">
                  <input
                    type="number"
                    name="MobileNumber"
                    className=" w-3/4 px-4 py-2 border rounded-md focus:outline-none"
                    maxLength="10"
                    onChange={(event) => {
                      debugger
                      if(event.target.value.length==0){
                        document.getElementById("mobileNumber").style.color = "red";
                      }
                      else{
                        debugger
                        if(event.target.value.length == 10){
                          document.getElementById("showMobileNumber").style.display = "none";
                          setRegisterData({...registerData,[event.target.name]:event.target.value})
                        }
                        if (event.target.value.length < 10) {
                        document.getElementById("showMobileNumber").style.display = "block";
                        document.getElementById("mobileNumber").style.color = "white";
                        setRegisterData({...registerData,[event.target.name]:event.target.value})
                        }
                      }
                    }}
                  />
                  <button
                    className=" w-1/3 ml-4 bg-green-500 rounded-md text-white text-xl"
                    onClick={() => {
                      toggleOtpModel("block");
                    }}
                  >
                    Check
                  </button>
                </div>
                  <div>
                <p style={{display:'none'}} id="showMobileNumber" className="text-red-300">Please enter the correct mobile number</p>
                </div>
              </div>
            </div>
            <div className=" px-9 py-5">
              <button
                className=" w-full p-2  bg-blue-200 text-black hover:bg-blue-400 hover:text-white rounded-md text-xl"
                onClick={saveUserData}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Background -->
    <div class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>

    {/* <!-- OTP Modal --> */}
      <div
        id="OTPModel"
        style={{ display: "none" }}
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-50 "
      >
        <h2 class="text-2xl font-bold mb-6">Enter Mobile OTP</h2>

        {/* <!-- OTP Input --> */}

        <div className="flex flex-row">
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="0"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="1"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="2"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="3"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="4"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
          <div className="firstLetter border border-black w-12 h-12 rounded-md m-2">
            <input
              id="5"
              type="text"
              className="w-full h-full rounded-md p-4 text-xl mobileOTPClass"
              maxLength="1"
              onChange={mobileOtpEntered}
            />
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div class="flex justify-between pt-3">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Verify
          </button>
          <button
            id="cancelBtn"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              toggleOtpModel("none");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
