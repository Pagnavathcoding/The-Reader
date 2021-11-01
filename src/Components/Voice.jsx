import React, { useContext } from 'react';
import { Context } from '../App';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
const shadowDark = "2px 2px 5px 0px rgb(0 0 0 / 40%)";
const shadowLight = "0 2px 4px rgb(50 50 93 / 10%)";
const Voice = () => {
    const { voice, setVoice } = useContext(Context);
    const { counter, setCounter } = useContext(Context);
    const click = (id) => {
        setCounter(id);
    }
    return (
        <Router>
            <div className="voice">
                <p>Your voice is selected: <b>({counter + 1}) {voice[counter]}</b></p>
                <div className="v">
                    {
                        voice.map((data, index) => {
                            return (
                                <div onClick={() => click(index)} key={index} className="voice-item" style={{ boxShadow: shadowLight }}>
                                    <p>{index + 1}. {data}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Router>
    )
}
export default Voice;