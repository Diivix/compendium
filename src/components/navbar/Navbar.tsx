import React, { useState, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logo from '../common/Logo';
import { useDispatch } from 'react-redux'
import { REMOVE_TOKEN_PAIR } from '../../redux/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | undefined>(undefined);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleMenu = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleClick = (uri: string, removeToken: boolean) => {
    if (removeToken) {
      dispatch({ type: REMOVE_TOKEN_PAIR })
    }
    history.push(uri);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.logo} color="inherit" aria-label="menu" onClick={() => handleClick('/home', false)}>
          <Logo size="32px" color={'#ffffff'} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Compendium
        </Typography>
        <div className={`${classes.navButtons}`}>
          {/* <Button color="inherit" onClick={() => handleClick('/characters', false)}>
            Characters
          </Button> */}
          <Button color="inherit" onClick={() => handleClick('/spells', false)}>
            Spells
          </Button>
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
