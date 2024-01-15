const Register = () => {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input type="email" id="email" />
      </label>
      <label htmlFor="username">
        Username
        <input type="text" id="username" />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" id="password" />
      </label>
    </div>
  );
};

export default Register;
