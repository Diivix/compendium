import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import { isNull } from 'util';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
// import { SET_CHARACTERS } from '../../redux/types';
// import { useDispatch } from 'react-redux';
import { ICharacter } from '../../models/ICharacter';
import CharacterCard from './CharacterCard';

interface IOwnState {
  characters: ICharacter[];
}

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
  // const dispatch = useDispatch();
  const token = useSelector((state: IState) => {
    return state.token;
  });
  // const characters = useSelector((state: IState) => {
  //   return state.characters;
  // });

  const [state, setState] = useState<IOwnState>({ characters: [] });

  const fetchInitialData = async (token: string) => {
    // TODO: UNdo this
    // const characters = await charactersApi.getCharacters({ token })
    const characters : ICharacter[] = [ { id: 1, name: "Cruroar the beast slayer of the mountain", classType: "Ranger", level: 3, description: "The greatest ranger that ever lived." } ]

    setState({ ...state, characters });
    // dispatch({ type: SET_CHARACTERS, payload: characters });
  };

  useEffect(() => {
    if (!isNull(token) && state.characters.length === 0) fetchInitialData(token);
    // TODO: deep dive into the use of the empty array.
  }, []);

  const cards = state.characters.map((x) => <CharacterCard key={x.id} name={x.name} classType={x.classType} level={x.level} description={x.description} handleClick={() => {}} />);

  return (
    <div className={classes.container}>
      {/* TODO: Check if array is null/undefined as an empty list is still valid and should show an option to add a character */}
      { state.characters.length === 0 ? (
        <div className={classes.innerContainer}>
          <div className={classes.loader}>
            <Loader />
          </div>
        </div>
      ) : (
        <div className={classes.innerContainer}>
          <div className={classes.controlContainer}>
            
          </div>
          <div className={classes.cardContainer}>{cards}</div>
        </div>
      )}
    </div>
  );
};
