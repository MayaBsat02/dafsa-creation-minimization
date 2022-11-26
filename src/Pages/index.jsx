import React, { useState, useEffect } from "react";
import {
  add,
  maxDepth,
  findMax,
  minimize,
  minimizedTrie,
  trie,
} from "../Utils/trie-rec.js";
import Graphviz from "graphviz-react";
import { toDotString } from "../Utils/drawGraph.js";

const IndexPage = () => {
  const [language, setLanguage] = useState([
    // "aa",
    // "aab",
    // "aaab",
    // "aba",
    // "abab",
    // "ba",
    // "bab",
    // "baab",
    // "bba",
    // "bbab",
  ]);
  // add(language);
  // console.log("trie is", trie);
  const [graph, setGraph] = useState();
  const [minimizedGraph, setMinimizedGraph] = useState();
  return (
    <div style={{width:'100%'}}>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <div style={{backgroundColor:'#007791',width:'100%'}}>
      <h2 style={{color:'white',fontStyle:'italic'}}>Deterministic acyclic finite state automaton</h2>
      </div>
      <h6>Enter your Language in the textbox below</h6>
      <input
      style={{width:'50%',height:'30px',fontSize:'12px',borderRadius:'10px'}}
        type="text"
        onChange={(e) => setLanguage(e.target.value.split(","))}
      />
      {console.log(language)}
      <button
      style={{
        backgroundColor: '#007791',
        color: 'white',
        fontSize: '16px',
        padding: '10px 10px',
        borderRadius: '5px',
        margin: '10px 0px',
        cursor: 'pointer',
        width: '200px',
        border: 'none',
        fontStyle:'italic'
      }}
        onClick={() => {
          add(language);
          setGraph(toDotString(trie));
          console.log("trie is", trie);
          findMax(language);
          maxDepth(trie.root);
        }}
      >
        Create DAFSA
      </button>
      {console.log(graph)}
      {graph && <Graphviz dot={toDotString(trie)} options={{ width: 600 }} />}
      <button
      style={{
        backgroundColor: '#007791',
        color: 'white',
        fontSize: '16px',
        padding: '10px 10px',
        borderRadius: '5px',
        margin: '10px 0px',
        cursor: 'pointer',
        width: '200px',
        border: 'none',
        fontStyle:'italic'
      }}
        onClick={() => {
          minimize(trie);
          setMinimizedGraph(toDotString(minimizedTrie));
        }}
      >
        Minimize
      </button>
      {minimizedGraph && 
      <Graphviz dot={minimizedGraph} options={{ width: 600 }} />}
    </div>
    </div>
  );
};

export default IndexPage;
