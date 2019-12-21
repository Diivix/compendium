import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/Logo';
import Circle from '../assets/Circle';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    zIndex: 5
  },
  circle: {
    zIndex: 1,
    position: "absolute"
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    zIndex: 1
  },
  headerMargin: {
    marginTop: '150px'
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

function Login() {
  const classes = useStyles();
  
  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <div className={`${classes.containerLeft}`}>
        <div className={`${classes.logo}`}>
          <Logo size="200px" color={'#' + process.env.REACT_APP_PRIMARY_COLOR} />
        </div>
        <div className={`${classes.circle}`}>
          <Circle size="600px" color={'#' + process.env.REACT_APP_ACCENT_COLOR} animate={true} duration={5}/>
        </div>
      </div>
      <div className={`${classes.containerRight}`}>
        <h1>Welcome to Compendium</h1>
        <p>Who seeks my knowledge?</p>
        <form className={`${classes.form}`} noValidate autoComplete="off">
          <TextField id="login-email" label="Email" type="email" autoComplete="current-email" margin="normal" />
          <TextField id="login-password" label="Password" type="password" autoComplete="current-password" margin="normal" />
          <Button id="login-submit" className={classes.button} variant="outlined" color="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
