import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMargin: {
    marginTop: '150px'
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
}));

function Login() {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <h1>Welcome to Compendium</h1>
      <p>Now who seeks my knowledge?</p>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField id="login-email" label="Email" type="email" autoComplete="current-email" margin="normal"/>
        <TextField id="login-password" label="Password" type="password" autoComplete="current-password" margin="normal" />
        <Button id="login-submit" className={classes.button} variant="outlined" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
