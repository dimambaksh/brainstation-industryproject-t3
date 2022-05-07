import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./LogIn.css"

export default function Login ({email, password, listener, submitListener}) {
  return (
    <>
      <h1>Log in</h1>
      <form className="LogIn" onSubmit={(event) => submitListener(event)}>
        <TextField
          id="email"
          label="Email Address"
          value={email}
          onChange={(event) => listener(event)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => listener(event)}
          autoComplete="current-password"
        />
        <Button variant="contained" type="submit">Log In</Button>

      </form>
    </>
  );
}
