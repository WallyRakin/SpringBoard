import { useState } from 'react'
import './App.css'
import { MadlibForm } from './MadlibForm';
import { Story } from './Story';

function App() {

  const [noun1, setNoun1] = useState('');
  const changeNoun1 = (evt) => { setNoun1(evt.target.value) };
  const [noun2, setNoun2] = useState('');
  const changeNoun2 = (evt) => { setNoun2(evt.target.value) };
  const [adjective, setAdjective] = useState('');
  const changeAdjective = (evt) => { setAdjective(evt.target.value) };
  const [color, setColor] = useState('');
  const changeColor = (evt) => { setColor(evt.target.value) };

  const [submit, setSubmit] = useState(false);
  const toggleSubmit = (evt) => { evt.preventDefault(); setSubmit(!submit); };

  return (
    <>
      <h1>Madlibs!</h1>
      {
        !submit ?
          <MadlibForm noun1={noun1} noun2={noun2} color={color} adjective={adjective} changeNoun1={changeNoun1} changeNoun2={changeNoun2} changeAdjective={changeAdjective} changeColor={changeColor} toggleSubmit={toggleSubmit} />
          :
          <Story noun1={noun1} noun2={noun2} color={color} adjective={adjective} toggleSubmit={toggleSubmit} />
      }
    </>
  );
};

export default App
