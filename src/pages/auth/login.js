import React from "react";

const Login = () => {
  return (
    <body>
      <header>
        <h1>Login using...</h1>
      </header>
      <main>
        <a href="/auth/facebook">Facebook</a>
        <br />
        <a href="/auth/linkedin">Linkedin</a>

        <form action="/auth/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>
      </main>
    </body>
  );
};

export default Login;
