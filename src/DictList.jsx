import React, { useState } from "react";
import { FixedSizeList } from "react-window";
import styled from "styled-components";
import dict from './cedict.json'
import debounce from 'lodash.debounce'

const Search = ({ }) => {
  const [filteredEntries, setFilteredEntries] = useState([]);
  const onChange = debounce((e) => {
    const val = e.target.value.toLowerCase();
    const filtered = dict.filter(
      (entry) =>
        entry.simplified.toLowerCase().includes(val) ||
        entry.definitions[0].toLowerCase().includes(val)
    );
    setFilteredEntries(filtered);
  }, 150);

  return (
    <div className="mainDict">
      <span>Filter: </span>
      <input type="text" onChange={onChange} />
        <FixedSizeList
          height={600}
          itemCount={filteredEntries.length}
          itemSize={150}
        >
  {({ index, style }) => {
    const entry = filteredEntries[index]
      return <div className="entry" style={style}>
        <div className="word">{entry.simplified} | {entry.pinyin}
        <br/><span className="def">
          {entry.definitions}
        </span>
        </div>
         <div><button>add</button>
         </div>
      </div>
  }}
        </FixedSizeList>
    </div>
  );
};
export default Search
