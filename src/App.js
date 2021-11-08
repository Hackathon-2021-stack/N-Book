import React from "react";
import {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import About from "./components/About";
import Alart from "./components/Alart";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";

function App() {
  const [salart, setAlart] = useState(null)

  const ShowAlert = (message, type) => {
    setAlart({
      Message: message,
      Type: type,
    });
    // console.log(alert.type,alert.Message)
    // setTimeout(() => {
    //   setAlart(null)
      
    // }, 1000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alart salart={salart}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home ShowAlert={ShowAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login ShowAlert={ShowAlert}/>
              </Route>
              <Route exact path="/signup">
                <SignUp ShowAlert={ShowAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
