/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

interface Props {
  password?: string;
}

interface Indicator {
  isValid: boolean;
  text: string;
}

interface Validity {
  minLength: boolean;
  minLowerCase: boolean;
  minUpperCase: boolean;
  minNumbers: boolean;
  minSpecSymbols: boolean;
}

const PasswordStrengthIndicatorItems = ({ isValid, text }: Indicator) => {
  return (
    <li
      className={`${isValid ? "text-teal-600" : "text-gray-400"} text-xs font-semibold sm:text-sm sm:font-medium`}
    >
      {text}
    </li>
  );
};

const PasswordStrength = ({ password }: Props) => {
  const [passwordValidity, setPasswordValidity] = useState<Validity>();
  const testResult = zxcvbn(password || "");
  const width = (testResult.score * 100) / 4;

  const lowerCase = /^(?=.*?[a-z])/; // at least one lowercase
  const upperCase = /^(?=.*?[A-Z])/; // at least one uppercase
  const specialCharacter = /(?=.*?[!@#$%^&*()])/; // at least one special character
  const length = /.{8,}$/; // at least 8 character long
  const integer = /(?=.*\d)/; // at least one digit

  useEffect(() => {
    if (password) {
      setPasswordValidity({
        minLength: length.test(password),
        minLowerCase: lowerCase.test(password),
        minUpperCase: upperCase.test(password),
        minNumbers: integer.test(password),
        minSpecSymbols: specialCharacter.test(password),
      });
    }
  }, [password]);

  const progressBarColor = (): string => {
    switch (testResult.score) {
      case 0:
        return "grey";
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "#2dd4bf";
      case 4:
        return "#0d9488";
      default:
        return "";
    }
  };
  const progressLabel = (): string => {
    switch (testResult.score) {
      case 0:
        return "Very Week";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const changeProgressBar = (): React.CSSProperties => ({
    width: `${width}%`,
    background: progressBarColor(),
  });

  return (
    <>
      <div className="pb-1.5 text-xs sm:text-sm">
        Password Strength :{" "}
        <span style={{ color: progressBarColor() }} className="font-semibold">
          {progressLabel()}
        </span>
      </div>
      <div className="mb-1.5 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-1.5 rounded-full" style={changeProgressBar()} />
      </div>
      <div className="text-xs sm:text-sm">Password must contain :</div>
      <ul>
        <PasswordStrengthIndicatorItems
          isValid={passwordValidity?.minLength ?? false}
          text={"At least 8 characters"}
        />
        <PasswordStrengthIndicatorItems
          isValid={passwordValidity?.minLowerCase ?? false}
          text={"At least one lowercase"}
        />
        <PasswordStrengthIndicatorItems
          isValid={passwordValidity?.minUpperCase ?? false}
          text={"At least one uppercase"}
        />
        <PasswordStrengthIndicatorItems
          isValid={passwordValidity?.minNumbers ?? false}
          text={"At least one number"}
        />
        <PasswordStrengthIndicatorItems
          isValid={passwordValidity?.minSpecSymbols ?? false}
          text={"At least one special character"}
        />
      </ul>
    </>
  );
};

export default PasswordStrength;
