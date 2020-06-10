// @ts-check
import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Logo from '../common/Logo';
import Circle from '../common/Circle';
import * as authApi from '../../api/auth';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { ADD_ACCESS_TOKEN, UPDATE_CHARACTERS } from '../../redux/types';
import { useHistory } from 'react-router-dom';

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

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isBadRequest, setIsBadRequest] = useState<boolean>(false);
  const [isInError, setIsInError] = useState<boolean>(false);

  async function handleSubmit(email: string, password: string) {
    const credentials = { email, password };
    const result = await authApi.login(credentials);
    if (result === null) {
      // creds rejected
      setIsBadRequest(true);
    } else if (result === undefined) {
      // Network error
      setIsInError(true);
    } else {
      dispatch({ type: ADD_ACCESS_TOKEN, payload: result.accessToken });
      dispatch({ type: UPDATE_CHARACTERS, payload: true });
    }
  }

  if (isInError) {
    history.push('/error');
  }

  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <div className={`${classes.innerContainer}`}>
        <div className={`${classes.logo}`}>
          <Logo size="200px" color={'#' + process.env.REACT_APP_PRIMARY_COLOR} />
        </div>
        <div className={`${classes.circle}`}>
          <Circle size="500px" color={'#' + process.env.REACT_APP_ACCENT_COLOR} animate={true} duration={15} />
        </div>
      </div>

      <LoginForm badRequest={isBadRequest} handleSubmit={handleSubmit} />
    </div>
  );
};
