import React from 'react';
import { Route, Switch } from 'react-router';
import Navbar from '../navbar/Navbar'
import SpellCompendium from '../spells/SpellCompendium';
import FullSpell from '../spells/FullSpell';

export default function App() {
  // let isAuthenticated = false;

  // if (accessToken !== null && accessToken !== undefined && isTokenValid(accessToken)) {
  //   isAuthenticated = true;
  // } else if (accessToken !== null && accessToken !== undefined && !isTokenValid(accessToken)) {
    // TODO: Do not remove token, instead use the refresh token (and access token) to get a new token pair from the server.
    // If the response is bad, clear out both tokens and log the user out.

    // OLD COMMENT - If the accessToken exists but isn't valid, remove it form the store.
    // dispatch({ type: REMOVE_TOKEN_PAIR });
  // }

  // useEffect(() => {
  //   if (accessToken !== null && charactersRequireUpdate) {
  //     fetchData(accessToken);
  //   };

  //   // FIXME: fetchData gets called twice when creating a new character, but should only be called once.
  //   async function fetchData(accessToken: string) {
  //     // TODO: consider not setting loading here as it causes the whole app to show a loading component.
  //     setIsLoading(true);
  //     const characters = await charactersApi.getAllCharacters({ accessToken })
  //     if (characters === null) {
  //       setIsInError(true);
  //     } else {
  //       const decodedCharacter = characters.map(x => decodeCharacter(x));
  //       dispatch({ type: SET_CHARACTERS, payload: decodedCharacter });
  //       dispatch({ type: UPDATE_CHARACTERS, payload: false });
  //       setIsLoading(false);
  //     }
  //   }
  // });

  // if (isInError) {
  //   return <ErrorComponent title="The Compendium is not available" message="" />
  // }

  // if (isLoading) {
  //   return (<Loader />)
  // }

  return (
    <div>
      <Navbar />

      <div className="content">
        <Switch>
          {/* <Routes isAuthenticated={isAuthenticated} /> */}
          

          <Route key={"spellId"} path={'/spells/:id'}>
            <FullSpell />
          </Route>

          <Route key='spells' path="/spells">
            <SpellCompendium />
          </Route>

          <Route key='spells' path="/">
            <SpellCompendium />
          </Route>

          
        </Switch>
      </div>
    </div>
  );
};
