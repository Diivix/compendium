import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loader from '../common/Loader';
import { isNull } from 'util';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import CharacterCard from './CharacterCard';
import AddItemCard from '../common/AddItemCard';
import { useHistory } from 'react-router-dom';
import { CREATE_CHARACTER_PATH } from '../routes/Paths';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0px 5% 0px 5%',
    },
    title: {
      width: '100%',
      marginTop: '20px'
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    loader: {
      marginTop: '200px',
    },
  })
);

// Loading the user's characters is controlled from the App Component.
export default function CharacterCompendium() {
  const classes = useStyles();
  const history = useHistory();
  const characters = useSelector((state: IState) => {
    return state.characters;
  });

  const handleCreateCharacter = () => {
    history.push(CREATE_CHARACTER_PATH);
  };

  const cards = characters?.map((x) => <CharacterCard key={x.id} id={x.id} name={x.name} level={x.level} classTypes={x.classTypes} race={x.race} />);

  if (isNull(characters)) {
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h1" component="h1" gutterBottom>
          Your Characters
        </Typography>
      </div>
      <div className={classes.cardContainer}>
        {cards}
        <AddItemCard typeName="Character" handleClick={() => { handleCreateCharacter(); }}
        />
      </div>
    </div>
  );
}
