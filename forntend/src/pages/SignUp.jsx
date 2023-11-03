import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
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
        <button>Sign up</button>
      </form>
    </>
  );
}

export default SignUp;
