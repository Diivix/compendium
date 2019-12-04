import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerMargin: {
    marginTop: '150px'
  }
}));

function ErrorNotFound() {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <h1>404: Not Found</h1>
    </div>
  );
}

export default ErrorNotFound;
