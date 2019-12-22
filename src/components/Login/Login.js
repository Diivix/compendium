import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/Logo';
import Circle from '../assets/Circle';
import { useStore } from '../../store';
import { login } from '../../actions';
import * as authApi from '../../api/auth';

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

export default () => {
  // eslint-disable-next-line no-unused-vars
  const [{ token }, dispatch] = useStore();
  const classes = useStyles();

  async function handleSubmit(event) {
    event.preventDefault();
    const credentials = { email: event.target.email.value, password: event.target.password.value };
      const result = await authApi.login(credentials);
      if(result !== null){
        const token = result.token;
        dispatch(login(token));
      } else {
        console.log("Login failed. User token is null.")
      }
  }

  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <div className={`${classes.containerLeft}`}>
        <div className={`${classes.logo}`}>
          <Logo size="200px" color={'#' + process.env.REACT_APP_PRIMARY_COLOR} />
        </div>
        <div className={`${classes.circle}`}>
          <Circle size="600px" color={'#' + process.env.REACT_APP_ACCENT_COLOR} animate={true} duration={15}/>
        </div>
      </div>
      <div className={`${classes.containerRight}`}>
        <h1>Welcome to Compendium</h1>
        <p>Who seeks my knowledge?</p>
        {/* We're not using a "controlled" component for the form input fields, as it causes the component to re-render and refresh the animations */}
        <form className={`${classes.form}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="email" name="email" label="Email" type="email" autoComplete="current-email" margin="normal" />
          <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" margin="normal" />
          <Button id="submit" className={classes.button} variant="outlined" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
