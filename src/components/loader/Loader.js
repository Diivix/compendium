// @ts-check
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/Logo';
import Circle from '../assets/Circle';


const styles = makeStyles(theme => ({
  logo: {
    marginRight: theme.spacing(2)
  }
}));

export default () => {
  // @ts-ignore
  const classes = styles();


  return (
    <div className={`${classes.logo}`}>
      <Logo size="200px" color={'#' + process.env.REACT_APP_PRIMARY_COLOR} animate={true} duration={3} />
    </div>
  );
};
