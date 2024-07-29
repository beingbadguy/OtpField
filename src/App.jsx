import React, { useEffect, useRef, useState } from "react";

const App = ({ noOfField = 6 }) => {
  const [otpField, setOtpField] = useState(new Array(noOfField).fill(""));
  const ref = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (value.length > 1 || isNaN(value)) {
      return;
    }

    const otpCopy = [...otpField];
    otpCopy[index] = value;
    setOtpField(otpCopy);
    


    if (value && index + 1 < otpField.length) {
      ref.current[index + 1].focus();
    }
  };

  const keyDownHandler = (e, index) => {
    const key = e.key;

    if (key === "ArrowRight" && index + 1 < otpField.length) {
      ref.current[index + 1].focus();
    }

    if (key === "ArrowLeft" && index - 1 >= 0) {
      ref.current[index - 1].focus();
    }

    if (key === "Backspace") {
      const otpNewCopy = [...otpField];
      otpNewCopy[index] = "";
      setOtpField(otpNewCopy);

      if (index - 1 >= 0) {
        ref.current[index - 1].focus();
      } else {
        ref.current[index].focus();
      }
    }
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-4 min-h-[100vh]">
      <p className="font-bold">Enter your OTP Here</p>
      <div>
        {otpField.map((value, index) => {
          return (
            <input
              ref={(currentState) => (ref.current[index] = currentState)}
              type="tel"
              key={index}
              value={value}
              className="border border-purple-500 w-[50px] ml-2 sm:ml-10 mt-10 rounded p-2 text-center font-bold outline-purple-700 shadow-lg  active:shadow-purple-700/50"
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => keyDownHandler(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
