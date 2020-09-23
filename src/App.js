import React, { useState, useRef, useEffect } from 'react';

import './App.css';

import Honker from './Honker';

const BirthdayMessage = `Happy Birthday Sfé!

I hope you have your audio on, to truly enjoy this experience.

I made this great site just for you; I hope you appreciate it!

You also better be prepared to play birthday goose game with me at some point today!!!!

I guess we could replace this great goose message with your homepage if you like; as this url is your bday present from me!

Love, Al

PS: Here are some great bonus content honks:

`.split("\n").join("<br/> ");


const splitMessage = BirthdayMessage.split(" ");

const bonusHonks = [];

const randomHonk = () => {
  const upperCaseFirst = Math.random() > 0.5;
  const upperCaseAll = Math.random() > 0.8;
  const numberOfOs = Math.round(Math.pow(Math.random(), 5)*10) + 1;
  let honk = upperCaseFirst ? "H" : "h";
  for (let i = 0; i < numberOfOs; i++){
    honk += upperCaseAll ? "O" : "o";
  }
  honk += upperCaseAll ? "NK" : "nk";
  return honk;
};

const getMessage = (totalWords) => {
  if (totalWords < 0) return "";

  if (totalWords >= 0 && totalWords < splitMessage.length) {
    return splitMessage.slice(0, totalWords).join(" ")
  } else {
    if (totalWords - splitMessage.length > bonusHonks.length) {
      bonusHonks.push(randomHonk());
    }
  }
  return BirthdayMessage + bonusHonks.join("</br></br>");
}

function App() {
  const [honking, setHonking] = useState(false);
  const [showHonk, setShowHonk] = useState(false);
  const [honks, setHonks] = useState(0); //splitMessage.length);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [honks]);

  const startHonk = () => {
    if (!honking) {
      setHonking(true);
      setShowHonk(true);
      setTimeout(() => setHonking(false), 200);
      setTimeout(() => setShowHonk(false), 180);
      setHonks(honks + 1);
    }
  }
  const isHonk = (e) => {
    console.log(e.target.keyCode);
  }
  return (
    <div className="App" onClick={startHonk} onKeyDown={isHonk}>
      <header className="App-header">
        <div className="BdayMessage"><div dangerouslySetInnerHTML={{__html: getMessage(honks -2)}} /><div ref={messagesEndRef} /></div> 
        <Honker honking={showHonk}/>
      </header>
    </div>
  );
}

export default App;
