import React, { useState } from "react";
import { FixedSizeList } from "react-window";
// import styled from "styled-components";
import dict from "./cedict.json";
import debounce from "lodash.debounce";
// import dbRef from './db'
import firebase from "firebase/app";

const Search = ({ vocab }) => {
  const [filteredEntries, setFilteredEntries] = useState(dict);
  const onChange = debounce((e) => {
    const val = e.target.value.toLowerCase();
    if (!val) return setFilteredEntries(dict);
    const filtered = dict.filter(
      (entry) =>
        entry.simplified.toLowerCase().includes(val) ||
        entry.definitions.toLowerCase().includes(val)
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
          const entry = filteredEntries[index];
          const added = vocab.find((v) => {
            return v[1].word === entry.simplified;
          });

          return (
            <div className={`entry ${added ? "isAdded" : ""}`} style={style}>
              <div className="word">
                {entry.simplified} | {entry.pinyin}
                <br />
                <span className="def">{entry.definitions}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    const vocabRef = firebase.database().ref("vocab");
                    if (added) {
                      const id = added[0];
                      return vocabRef.update({
                        [id]: null,
                      });
                    }
                    const newVocab = vocabRef.push();
                    newVocab.set({
                      word: entry.simplified,
                    });
                  }}
                >
                  {added ? "remove" : "add"}
                </button>
              </div>
            </div>
          );
        }}
      </FixedSizeList>
    </div>
  );
};
export default Search;
