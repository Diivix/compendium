// @ts-check
import React, { useState, FormEvent } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      zIndex: 1
    },
    button: {
      marginTop: theme.spacing(2),
      width: '100%'
    }
  })
);

interface IProps {
  handleSubmit: (email: string, password: string) => void;
}

export default ({ handleSubmit }: IProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSubmit(email, password);
  };

  return (
    <div className={`${classes.container}`}>
      <h1>Welcome to Compendium</h1>
      <p>Who seeks my knowledge?</p>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          margin="normal"
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <Button id="submit" className={classes.button} variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};
