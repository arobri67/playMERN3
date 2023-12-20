import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Home from "./assets/pages/home/Home";
// import LogIn from "./assets/pages/login/LogIn";
// import Games from "./assets/pages/games/Games";
// import Unprotected from "./assets/layouts/Unprotected";
// import Protected from "./assets/layouts/Protected";
// import TicTacToe from "./assets/pages/games/tictactoe/TicTacToe";
// import WordGuess from "./assets/pages/games/wordguess/WordGuess";
// import Sudoku from "./assets/pages/games/sudoku/Sudoku";

const Home = lazy(() => import("./assets/pages/home/Home"));
const LogIn = lazy(() => import("./assets/pages/login/LogIn"));
const Games = lazy(() => import("./assets/pages/games/Games"));
const Unprotected = lazy(() => import("./assets/layouts/Unprotected"));
const Protected = lazy(() => import("./assets/layouts/Protected"));
const TicTacToe = lazy(() =>
  import("./assets/pages/games/tictactoe/TicTacToe")
);
const WordGuess = lazy(() =>
  import("./assets/pages/games/wordguess/WordGuess")
);
const Sudoku = lazy(() => import("./assets/pages/games/sudoku/Sudoku"));

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Suspense>
              <Unprotected />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense>
                <LogIn />
              </Suspense>
            }
          ></Route>
        </Route>
        <Route
          element={
            <Suspense>
              <Protected />
            </Suspense>
          }
        >
          <Route
            path="/games"
            element={
              <Suspense>
                <Games />
              </Suspense>
            }
          ></Route>
          <Route
            path="/tictactoe"
            element={
              <Suspense>
                <TicTacToe />
              </Suspense>
            }
          ></Route>
          <Route
            path="/wordguess"
            element={
              <Suspense>
                <WordGuess />
              </Suspense>
            }
          ></Route>
          <Route
            path="/sudoku"
            element={
              <Suspense>
                <Sudoku />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
