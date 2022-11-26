export const toDotString=(trie)=> {
    let dotStr = "digraph fsm {\n";
    // dotStr += 'size="8,5";\n';
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr += "node [shape = doublecircle]; " + trie.finalNodes.join(",") + ";\n";
    dotStr += "node [shape = circle];\n";
    dotStr += "INITIAL_STATE -> " + 'root' + ";\n";
  
    for (let i = 0; i < trie.transitions?.length; i++) {
      let t = trie.transitions[i];
  
      dotStr +=
        "" +
        t.currentNode +
        " -> " +
        t.nextNodes +
        " [label=" +
        t.character +
        "];\n" ;
    }
  
    dotStr += "}";
  
    return dotStr;
  }
  