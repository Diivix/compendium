import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { truncate, upperFirst } from '../../utils/common';
import { buildLevel } from '../../utils/spells';
import { useHistory } from 'react-router-dom';
import { CHARACTERS_PATH } from '../routes/PathConsts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      maxWidth: '350px',
      minWidth: '250px',
      margin: '5px 5px 5px 5px',
      border: '1px solid',
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.dark,
    },
    cardActionArea: {
      display: 'flex'
    },
    content: {
      flex: '1 0 auto',
    },
    avatar: {
      marginLeft: '10px',
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      backgroundColor: theme.palette.background.default,
    },
  })
);

interface IProps {
  id: number
  name: string;
  level: number;
  classType: string;
}

export default function CharacterCard({ id, name, level, classType }: IProps) {
  const classes = useStyles();
  const nameTruncated: string = truncate(upperFirst(name.toLowerCase()), 15);
  const builtLevel = buildLevel(level, classType, true);
  const icon: JSX.Element = <i className="ra ra-hood ra-4x" />;
  const [raised, setRaised] = useState(false);
  const history = useHistory();

  const handleRaised = () => {
    setRaised(!raised);
  };

  const handleOpen = () => {
    history.push(CHARACTERS_PATH + '/' + id);
  };

  return (
    <Card className={classes.card} raised={raised} onMouseOver={handleRaised} onMouseOut={handleRaised}>
      <CardActionArea className={classes.cardActionArea} onClick={handleOpen}>
          <CardMedia className={classes.avatar}>{icon}</CardMedia>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {nameTruncated}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {builtLevel}
            </Typography>
          </CardContent>
      </CardActionArea>
    </Card>
  );
};
