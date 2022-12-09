
import React from 'react';
import {Quiz} from "./src/screens";
const QuizGame = (props) => {
  return (
    <Quiz
        navigation={props.navigation}
        games={props.route.params.games}/>
  );
};


export default QuizGame;
