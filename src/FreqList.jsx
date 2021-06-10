import React, { useState } from "react";
import { FixedSizeList } from "react-window";
// import styled from "styled-components";
import freqWords from "./10000-words.json";
import dict from "./cedict.json";
// import debounce from "lodash.debounce";
// import dbRef from './db'
import firebase from "firebase/app";

const Words = ({ vocab }) => {
  const [lookup, setLookup] = useState();
  return (
    <div className="mainDict">
      <div>
        lookup:{" "}
        {lookup?.map((l, i) => (
          <div key={i}>
            {l.simplified}
            {l.pinyin}
            <br />
            {l.definitions}
          </div>
        ))}
      </div>
      <FixedSizeList height={600} itemCount={freqWords.length} itemSize={80}>
        {({ index, style }) => {
          const entry = freqWords[index];
          const added = false;
          // vocab.find((v) => {
          //   return v[1].word === entry.simplified;
          // });

          return (
            <div
              className={`entry ${added ? "isAdded" : ""}`}
              style={style}
              onClick={() => {
                const filtered = dict.filter((dictEntry) =>
                  dictEntry.definitions.includes(entry)
                );
                setLookup(filtered);
              }}
            >
              <div className="word">
                {index}.{"  "}
                {entry}
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
export default Words;
