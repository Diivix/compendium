import React, {  } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerMargin: {
    marginTop: '150px'
  },
  avatar: {
    display: 'flex',
    color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    fontSize: '3000%',
    zIndex: -1,
    alignSelf: 'flex-end',
    opacity: '0.6',
    position: 'absolute',
    marginTop: '100px'
  },
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <h1>404 Not Found</h1>
      <h2>The knowledge you seek simply doesn't exist.</h2>
      <div className={classes.avatar}><i className="ra ra-bleeding-eye ra-lg" /></div>
    </div>
  );
}
