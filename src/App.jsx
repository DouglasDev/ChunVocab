import React, { useState } from "react";
import "./App.css";
import dict from './cedict.json'
import DictList from './DictList'

const modes = {
  search: <DictList />
}

function App() {
  const [mode,setMode] = useState('search')
  return <div>
    <div>{
      Object.keys(modes).map(m=>
      <button key={m} onClick={()=>setMode(m)}>{m}</button>)
    }
      </div>
  {modes[mode]}
  </div>
}

export default App;
