// @ts-check
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Logo from '../common/Logo';
import Circle from '../common/Circle';
import { useStore } from '../../store';
import { login } from '../../actions';
import * as authApi from '../../api/auth';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    innerContainer: {
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
      position: 'absolute'
    },
    headerMargin: {
      marginTop: '150px'
    }
  })
);

export default () => {
  // eslint-disable-next-line no-unused-vars
  const [{ token }, dispatch] = useStore();
  const classes = useStyles();

  async function handleSubmit(email: string, password: string) {
    const credentials = { email, password };
    const result = await authApi.login(credentials);
    if (result !== null) {
      dispatch(login(result.token));
    } else {
      console.log('Login failed. User token is null.');
    }
  }

  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <div className={`${classes.innerContainer}`}>
        <div className={`${classes.logo}`}>
          <Logo size="200px" color={'#' + process.env.REACT_APP_PRIMARY_COLOR} />
        </div>
        <div className={`${classes.circle}`}>
          <Circle size="600px" color={'#' + process.env.REACT_APP_ACCENT_COLOR} animate={true} duration={15} />
        </div>
      </div>

      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};
