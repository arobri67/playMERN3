import "./App.css";
import Home from "./assets/pages/home/home";
import LogIn from "./assets/pages/login/LogIn";
import Games from "./assets/pages/games/Games";
import Unprotected from "./assets/layouts/Unprotected";
import Protected from "./assets/layouts/Protected";
import TicTacToe from "./assets/pages/games/tictactoe/TicTacToe";
import WordGuess from "./assets/pages/games/wordguess/WordGuess";
import Sudoku from "./assets/pages/games/sudoku/Sudoku";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Unprotected />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
        </Route>
        <Route element={<Protected />}>
          <Route path="/games" element={<Games />}></Route>
          <Route path="/tictactoe" element={<TicTacToe />}></Route>
          <Route path="/wordguess" element={<WordGuess />}></Route>
          <Route path="/sudoku" element={<Sudoku />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
