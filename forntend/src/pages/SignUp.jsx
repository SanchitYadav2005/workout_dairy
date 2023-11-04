import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signUp, error, isLoading} = useSignUp();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await signUp(email, password)
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button disabled={isLoading}>Sign up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

export default SignUp;
