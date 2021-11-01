import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Work from './Components/Work';
import Voice from './Components/Voice';

const shadowDark = "2px 2px 5px 0px rgb(0 0 0 / 40%)";
const shadowLight = "0 2px 4px rgb(50 50 93 / 10%)";
export const Context = createContext(null);
const App = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [voice, setVoice] = useState([
    "UK English Female",
    "UK English Male",
    "US English Female",
    "Spanish Female",
    "French Female",
    "Deutsch Female",
    "Italian Female",
    "Greek Female",
    "Hungarian Female",
    "Turkish Female",
    "Russian Female",
    "Dutch Female",
    "Swedish Female",
    "Norwegian Female",
    "Japanese Female",
    "Korean Female",
    "Chinese Female",
    "Hindi Female",
    "Serbian Male",
    "Croatian Male",
    "Bosnian Male",
    "Romanian Male",
    "Catalan Male",
    "Australian Female",
    "Finnish Female",
    "Afrikans Male",
    "Albanian Male",
    "Arabic Male",
    "Armenian Male",
    "Czech Female",
    "Danish Female",
    "Esperanto Male",
    "Icelandic Male",
    "Indonesian Female",
    "Latin Female",
    "Latvian Male",
    "Macedonian Male",
    "Moldavian Male",
    "Montenegrin Male",
    "Polish Female",
    "Brazilian Portuguese Female",
    "Portuguess Female",
    "Serbo-Croatian Male",
    "Slovak Female",
    "Spanish Latin American Female",
    "Swahili Male",
    "Tamil Male",
    "Thai Female",
    "Vietnamese Male",
    "Welsh Male"
  ]);
  const handleSubmit = () => {
    if (value === "") return;
    setToggle(!toggle);
    setData([
      ...data,
      {
        id: Date.now(),
        sentence: value,
        voice: voice[counter],
        toggle: false
      }
    ]);
    setValue("");
    window.location.pathname = "/";
  }
  useEffect(() => {
    const local = localStorage.getItem("data");
    if (local) {
      setData(JSON.parse(local));
    }
    else {
      setData([]);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    const count = localStorage.getItem("counter");
    if (count) {
      setCounter(Number(count));
    }
    else {
      setCounter(0);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter])
  return (
    <Router>
      <main>
        <div className="alert" style={{ display: toggle ? "flex" : "none" }}>
          <div className="enter">
            <div className="title">
              <h1>Add a Sentence or Paragraph.</h1>
              <p>Voice: <b>{voice[counter]}</b> <span onClick={() => {
                window.location.pathname = "/voices";
              }}>Change Voice</span></p>
              <textarea style={{ boxShadow: shadowLight }} placeholder="Add a Sentence or Paragraph..." value={value} onChange={e => setValue(e.target.value)}></textarea>
            </div>
            <div className="add-close">
              <button style={{ boxShadow: shadowDark }} onClick={() => setToggle(!toggle)}>Close</button>
              <button style={{ boxShadow: shadowDark }} onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
        <header>
          <div className="logo" style={{ boxShadow: shadowDark }} onClick={() => {
            window.location.pathname = "/";
          }}>
            <h1><i class="fa fa-bookmark-o"></i> <span>The Reader</span></h1>
          </div>
        </header>
        <div className="add">
          <button style={{ boxShadow: shadowDark }} onClick={() => setToggle(!toggle)}>Add <i class="fa fa-plus"></i></button>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="active" style={{ boxShadow: shadowLight }}>Your Work</NavLink></li>
            <li><NavLink to="/voices" exact activeClassName="active" style={{ boxShadow: shadowLight }}>Change Voice</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Context.Provider value={{ data, setData, voice, setVoice, counter, setCounter }}>
            <Route exact path="/" component={Work} />
            <Route path="/voices" component={Voice} />
          </Context.Provider>
        </Switch>
        <footer>
          <p>&copy; 2021 | Made by <a href="https://www.github.com/Pagnavathcoding">Pagnavath</a>.</p>
        </footer>
      </main>
    </Router>
  )
}
export default App;