import classes from "./ProfileForm.module.css";
import { useRef, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const submithandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // can add validation here
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJGK1hdWFATeua64_UyPE_vTQQH-Iz4eI`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authContext.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!!!";
            // if (data && data.error && data.error.message) {
            //   setError(data.error.message);
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("Successful SignUp");
      })
      .catch((err) => {
        setError("Authentication Failed");
        alert(err.message);
      });
  };
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        {/* bind ref to input ref={newPasswordInputRef*/}
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
