// @ts-check
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useStore } from '../../store';
import Logo from '../assets/Logo';

const styles = makeStyles(theme => ({
  appBar: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginRight: theme.spacing(6)
  },
  navButtons: {
    flexGrow: 1
  }
}));

/**
 * @typedef {object} props
 * @prop {function} handleLogout - A function to logout the the user.
 */
/** @type {props} */
export default ({ handleLogout }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ token }, dispatch] = useStore();
  // @ts-ignore
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu">
          <Logo size="32px" color={'#' + process.env.REACT_APP_BACKGROUND_COLOR} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Compendium
        </Typography>
        <div className={`${classes.navButtons}`}>
          <Button color="inherit">Spells</Button>
          <Button color="inherit">Characters</Button>
        </div>

        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
