// @ts-check

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { buildLevel, setSpellIcon } from '../../utils/spells';
import { truncate, upperFirst } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '250px',
    margin: '5px',
    border: '1px solid',
    backgroundColor: '#' + process.env.REACT_APP_BACKGROUND_COLOR,
    borderColor: '#' + process.env.REACT_APP_PRIMARY_COLOR
  },
  avatar: {
    color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    border: '1px solid',
    borderColor: '#' + process.env.REACT_APP_PRIMARY_COLOR,
    backgroundColor: '#' + process.env.REACT_APP_BACKGROUND_COLOR
  }
}));

/**
 * @typedef {object} props
 * @param {string} name - Spell name
 * @param {number} level - Spell level
 * @param {string} school - Spell school
 */
/** @type {props} */
export default ({ name, level, school }) => {
  // @ts-ignore
  const classes = useStyles();
  const nameTruncated = truncate(upperFirst(String(name).toLowerCase()), 20);
  const meta = buildLevel(level, school, true);
  const icon = setSpellIcon(school);

  const [raised, setRaised] = useState(false);

  const handleRaised = () => {
    setRaised(!raised);
  };
  
  const handleAction = () => {};

  return (
    <Card className={classes.card} raised={raised} onMouseOver={handleRaised} onMouseOut={handleRaised}>
      <CardActionArea onClick={handleAction}>
        <CardHeader
          avatar={
            <Avatar aria-label="Spell" className={`${classes.avatar}`}>
              {icon}
            </Avatar>
          }
          title={nameTruncated}
          subheader={meta}
        />
      </CardActionArea>
    </Card>
  );
};
