// @ts-check
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
 * @prop {function} setToken - A function to logout the the user.
 */
/** @param {props} */
export default ({ setToken }) => {
  // @ts-ignore
  const classes = styles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (uri, removeToken) => {
    if(removeToken) {
      setToken();
    }
    history.push(uri);
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu" onClick={() => handleClick('/home', false)}>
          <Logo size="32px" color={'#' + process.env.REACT_APP_BACKGROUND_COLOR} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Compendium
        </Typography>
        <div className={`${classes.navButtons}`}>
          <Button color="inherit" onClick={() => handleClick('/spells', false)}>Spells</Button>
          <Button color="inherit" onClick={() => handleClick('/characters', false)}>Characters</Button>
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
          <MenuItem onClick={() => handleClick('/login', true)}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
