// @ts-check
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Logo from '../common/Logo';
import Circle from '../common/Circle';
import { useStore } from '../../store';
import { login } from '../../actions';
import * as authApi from '../../api/auth';
import styles from './Login-Styles';

export default () => {
  // eslint-disable-next-line no-unused-vars
  const [{ token }, dispatch] = useStore();
  // @ts-ignore
  const classes = styles();

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
