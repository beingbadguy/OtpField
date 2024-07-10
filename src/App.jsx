import React, { useEffect, useRef, useState } from "react";

const App = ({ noOfField = 6 }) => {
  const [otpField, setOtpField] = useState(new Array(noOfField).fill(""));
  const ref = useRef([]);

  const keyDownHandler = (e, index) => {
    const key = e.key;
    if (key === "ArrowRight") {
      if (index + 1 < otpField.length) ref.current[index + 1].focus();
    }
    if (key === "ArrowLeft") {
      if (index - 1 >= 0) ref.current[index - 1].focus();
    }
    if (key === "Backspace") {
      const otpNewCopy = [...otpField];
      otpNewCopy[index] = "";
      if (index - 1 >= 0) ref.current[index - 1].focus();

      setOtpField(otpNewCopy);
      return;
    }
    if (isNaN(key)) {
      return;
    }

    const otpCopy = [...otpField];
    otpCopy[index] = key;
    if (index + 1 < otpField.length) ref.current[index + 1].focus();
    setOtpField(otpCopy);
  };

  useEffect(() => {
    ref.current[0].focus();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <p className="font-bold">Enter your otp Here</p>
      <div>
        {otpField.map((value, index) => {
          return (
            <input
              ref={(currentState) => (ref.current[index] = currentState)}
              type="text"
              key={index}
              value={value}
              className="border border-black  w-[50px] ml-10 mt-10 rounded p-2 text-center font-bold"
              onChange={() => {}}
              onKeyDown={(e) => {
                keyDownHandler(e, index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
