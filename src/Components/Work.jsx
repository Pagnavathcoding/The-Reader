import React, { useContext, useState } from 'react';
import { Context } from '../App';
const shadowDark = "2px 2px 5px 0px rgb(0 0 0 / 40%)";
const shadowLight = "0 2px 4px rgb(50 50 93 / 10%)";
const Work = () => {
    const { data, setData } = useContext(Context);
    const [toggle, setToggle] = useState(false);
    const removeItem = (id) => {
        setData(data.filter((data) => {
            return data.id !== id;
        }))
    }
    const speak = "Listen";
    const toggleShow = (id) => {
        setData(data.map((data) => {
            return data.id === id ? {
                ...data, toggle: !data.toggle
            } : data;
        }))
    }
    return (
        <div className="work">
            <h1 style={{ display: data.length > 0 ? "block" : "none" }}>Your current work: {data.length < 10 ? "0" + data.length : data.length}</h1>
            <h1 style={{ display: data.length > 0 ? "none" : "block" }}>Your work currently Empty!</h1>
            <p style={{ display: data.length > 0 ? "none" : "block", textAlign: "center" }}>Please click "Add +" button to add your sentence or paragraph.</p>
            {
                data.map((data) => {
                    return (
                        <div className="item" style={{ boxShadow: shadowLight }}>
                            <div className="bar">
                                <button title={speak} onClick={() => window.responsiveVoice.speak(data.sentence, data.voice)}><i className="fa fa-volume-up"></i></button>
                                <p>{new Date(data.id).toString().slice(0, 15)}</p>
                                <button style={{ background: "#ff0000" }} title="Remove" onClick={() => removeItem(data.id)}><i className="fa fa-trash-o"></i></button>
                            </div>
                            <p style={{ fontSize: "14px" }}>Voice: <span id="voice">{data.voice}</span></p>
                            <div className="sentence">
                                <p>{!data.toggle ? data.sentence.length >= 200 ? data.sentence.slice(0, 200) + "..." : data.sentence : data.sentence}</p>
                                <button style={{ display: data.sentence.length >= 200 ? "block" : "none", boxShadow: shadowDark }} onClick={() => toggleShow(data.id)}>{data.toggle ? "Show Less" : "Show More"}</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Work;