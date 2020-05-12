import React, { useState, SyntheticEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      maxWidth: '350px',
      minWidth: '250px',
      margin: '5px 0 5px 0',
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
  typeName: string;
  handleClick: (event: SyntheticEvent) => void;
}

export default ({ typeName, handleClick }: IProps) => {
  const classes = useStyles();
  const icon: JSX.Element = <i className="ra ra-hospital-cross ra-3x" />;
  const [raised, setRaised] = useState(false);

  const handleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Card className={classes.card} raised={raised} onMouseOver={handleRaised} onMouseOut={handleRaised}>
      <CardActionArea className={classes.cardActionArea} onClick={handleClick}>
          <CardMedia className={classes.avatar}>{icon}</CardMedia>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              Add {typeName}
            </Typography>
          </CardContent>
      </CardActionArea>
    </Card>
  );
};
