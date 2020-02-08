import React, { useState, SyntheticEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { buildLevel, setSpellIcon } from '../../utils/spells';
import { truncate, upperFirst } from '../../utils/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '250px',
      minWidth: '250px',
      margin: '5px 0 5px 0',
      border: '1px solid',
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.dark
    },
    avatar: {
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      border: '1px solid',
      borderColor: theme.palette.primary.dark,
      backgroundColor: theme.palette.background.default
    }
  })
);

interface IProps {
  name: string;
  level: number;
  school: string;
  handleClick: (event: SyntheticEvent) => void;
}

export default ({ name, level, school, handleClick }: IProps) => {
  const classes = useStyles();
  const nameTruncated: string = truncate(upperFirst(name.toLowerCase()), 20);
  const meta: string = buildLevel(level, school, true);
  const icon: JSX.Element = setSpellIcon(school);

  const [raised, setRaised] = useState(false);

  const handleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Card className={classes.card} raised={raised} onMouseOver={handleRaised} onMouseOut={handleRaised}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          avatar={
            <Avatar aria-label="Spell" className={classes.avatar}>
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
