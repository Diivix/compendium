import React, {  } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loader from '../common/Loader';
import { isNull } from 'util';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import CharacterCard from './CharacterCard';
import AddItemCard from '../common/AddItemCard';
import { useHistory } from 'react-router-dom';
import { CREATE_CHARACTER_PATH } from '../routes/PathConsts';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    innerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '10px 10px 10px 10px',
      justifyContent: 'center',
      width: '100%',
    },
    controlContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '5px 5px 5px 5px',
      justifyContent: 'space-between',
      width: '100%',
    },
    control: {
      display: 'flex',
      margin: '0 5px 0 5px',
      justifyContent: 'space-around',
    },
    controlMax: {
      width: '100%',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '5px 10px 0px 10px',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    loader: {
      marginTop: '200px',
    },
  })
);

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const characters = useSelector((state: IState) => {
    return state.characters;
  });

  const handleCreateCharacter = () => {
    history.push(CREATE_CHARACTER_PATH);
  }

  const cards = characters?.map((x) => <CharacterCard key={x.id} id={x.id} name={x.name} classType={x.classType} level={x.level} />);

  return (
    <div className={classes.container}>
      { isNull(characters) ? (
        <div className={classes.innerContainer}>
          <div className={classes.loader}>
            <Loader />
          </div>
        </div>
      ) : (
        <div className={classes.innerContainer}>
          <div className={classes.cardContainer}>
            {cards}
            <AddItemCard typeName="Character" handleClick={() => {handleCreateCharacter()}} />
          </div>
        </div>
      )}
    </div>
  );
};
