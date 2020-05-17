import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerMargin: {
      marginTop: '150px',
    },
    avatar: {
      display: 'flex',
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      fontSize: '3000%',
      zIndex: -1,
      alignSelf: 'flex-end',
      opacity: '0.6',
      position: 'absolute',
      marginTop: '100px',
    },
    button: {
      marginTop: theme.spacing(2),
    }
  })
);

interface IProps {
  title: string;
  message: string;
}

export default function ErrorComponent({ title, message }: IProps) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  }

  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <h1>{title}</h1>
      <p>{message}</p>

      <Button id="back" className={classes.button} variant="text" color="secondary" onClick={handleClick}>
        Go back
      </Button>
      {/* <div className={classes.avatar}><i className="ra ra-book ra-lg" /></div> */}
    </div>
  );
}
