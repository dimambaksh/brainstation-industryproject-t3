import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { theme } from "../../styles/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./LogIn.css"
import { Checkbox, FormControlLabel } from "@mui/material";



export default function Login ({email, password, listener, submitListener}) {
  return (
    <>
    {/* <ThemeProvider theme={theme}> */}
            <div className="threeCornerRectangle">
        <h1>BOND</h1>
      </div>
      <form className="LogIn" onSubmit={(event) => submitListener(event)}>
        <TextField
          className="dropShadow"
          id="email"
          label="Email Address"
          value={email}
          onChange={(event) => listener(event)}
        />
        <TextField
          className="dropShadow"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => listener(event)}
          autoComplete="current-password"
        />
        <FormControlLabel
                  control={<Checkbox sx={{
                    color: '#0A5587',
                    '&.Mui-checked': {
                      color: '#0A5587',
                    },
                  }}/>}
                  label={"Remember Me"}
                  className={"RememberMe"}
                />
        <Button variant="contained" size='large' color='primary' type="submit">Log In</Button>
        <Button color='primary'> Sign Up</Button>
        <Button color='primary'> Forgot Password</Button>

      </form>
      {/* </ThemeProvider> */}

    </>
  );
}
