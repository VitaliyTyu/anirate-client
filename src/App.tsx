import React, {useEffect, useState} from 'react';
import AnimeList from "./components/AnimeList";
import AnimeTitle from "./components/AnimeTitle";

const App = () => {
  return (
      <div>
          <AnimeTitle/>
          <hr/>
          <AnimeList/>
      </div>
  );
};

export default App;