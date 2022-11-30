/* Trie Data Structure */
class Node {
  constructor(name, children, isEnd) {
    let obj = {};
    children = obj;

    this.name = name;
    this.children = children;
    this.isEnd = false;
  }
}

class Transition {
  constructor(currentNode, nextNodes, character) {
    if (!(typeof character === "string" || character instanceof String))
      throw new Error("Expected a string symbol");

    this.currentNode = currentNode;
    this.nextNodes = nextNodes;
    this.character = character;
  }
}

export class Trie {
  constructor(root, nodes, finalNodes, transitions) {
    this.root = new Node("root", [], false);
    this.transitions = [];
    this.finalNodes = [];
    this.nodes = [];
  }
}

export class minimized {
  constructor(root, nodes, finalNodes, transitions) {
    this.root = new Node("root", [], false);
    this.transitions = [];
    this.finalNodes = [];
    this.nodes = ["root"];
  }
}

export let trie = new Trie();
export let minimizedTrie = new minimized();
console.log(trie);

export const add = (language) => {
  console.log(language);
  let i = 0;
  //for every word in language
  for (let j = 0; j < language.length; j++) {
    let current = trie.root;

    language[j].split("").forEach((character) => {
      let prev = current;
      //if character does not exist in children of current node
      if (!current.children[character]) {
        //add character to children of current node
        i += 1;
        current.children[character] = new Node(i, [], false);
        trie.nodes.push(current.children[character].name);
        let transition = new Transition(
          prev.name,
          current.children[character].name,
          character
        );
        trie.transitions.push(transition);
        console.log(trie.transitions);
        console.log("transition", transition);
      }
      console.log(
        "children of",
        current.name,
        "are",
        current.children[character].name
      );
      //move to next node

      current = current.children[character];
    });

    i = current.name;
    trie.finalNodes.push(current.name);
    //mark current node as end of word
    current.isEnd = true;
  }
};

//function to combine nodes who have same level
export const connectNodesSameLevel = (current) => {
  let levels = {};
  let height = maxDepth(current);
  for (let l = 0; l <= height; l++) {
    levels["h" + l] = [];
  }
  console.log(levels);
  return levels;
};

let levels = {};
//find max height of trie
export const findMax = (language) => {
  let max;
  for (let i = 0; i < language.length; i++) {
    max = Math.max(language[i].length);
    console.log(max);
  }
  for (let l = 0; l <= max; l++) {
    levels["h" + l] = [];
  }
  return max;
};

export const maxDepth = (current) => {
  const { children } = current;
  let height = 0;
  //let max = height;
  //let levels = {};

  if (children && Object.keys(children).length === 0) {
    height = 0;
    levels["h" + height].push(current);
    console.log("height of", current, "is", height);
    return height;
  } else {
    for (let i = 0; i < Object.values(children).length; i++) {
      let node = Object.values(children)[i];
      height = 1 + maxDepth(node);
    }
  }
  levels["h" + height].push(current);
  console.log("height of", current, "is", height);
  console.log("levels are", levels);
  combineNodes(levels);
  return height;
};

let finalNodesofLevel = {};
let nonFinalNodesofLevel = {};
export const combineNodes = (levels) => {
  for (let i = 0; i < Object.keys(levels).length; i++) {
    let level = Object.keys(levels)[i];

    console.log("level is", Object.values(levels)[i]);
    Object.values(levels)[i].forEach((node) => {
      console.log(node.name);
      if (node.isEnd == true) {
        finalNodesofLevel["h" + i] = levels["h" + i].filter(
          (node) => node.isEnd === true
        );
      } else {
        nonFinalNodesofLevel["h" + i] = levels["h" + i].filter(
          (node) => node.isEnd === false
        );
      }
    });
  }

  console.log("final nodes are", finalNodesofLevel);
  console.log("non final nodes are", nonFinalNodesofLevel);
};

export const minimize = (trie) => {
  minimizedTrie.root = trie.root;
console.log("minimizedTrie transitions", trie.transitions);
  for (let i = 0; i < Object.keys(finalNodesofLevel).length; i++) {
    trie.transitions.forEach((transition) => {
      {finalNodesofLevel["h" + i] &&
      finalNodesofLevel["h" + i].forEach((node) => {
        if (transition.nextNodes == node.name) {
          console.log(
            "node",
            node.name,
            "and next nodes",
            transition.nextNodes
          );
          minimizedTrie.transitions.push(
            new Transition(
              transition.currentNode,
              finalNodesofLevel["h" + i][0].name,
              transition.character
            )
          );
        }
      });
    }
    });
  }

  for (let i = 1; i < Object.keys(nonFinalNodesofLevel).length; i++) {
    trie.transitions.forEach((transition) => {
      {nonFinalNodesofLevel["h" + i] &&
      nonFinalNodesofLevel["h" + i].forEach((node) => {
        if (transition.nextNodes == node.name) {
          minimizedTrie.transitions.push(
            new Transition(
              transition.currentNode,
              nonFinalNodesofLevel["h" + i][0].name,
              transition.character
            )
          );
        }
      });
    }
    });
  }

  for (let i = 0; i < minimizedTrie.transitions.length; i++) {
    if (!minimizedTrie.nodes.includes(minimizedTrie.transitions[i].nextNodes))
      minimizedTrie.nodes.push(minimizedTrie.transitions[i].nextNodes);
  }
  console.log("minimized trie Nodes", minimizedTrie.nodes);

  for (let i = 0; i < minimizedTrie.transitions.length; i++) {
    if (
      !minimizedTrie.nodes.includes(minimizedTrie.transitions[i].currentNode)
    ) {
      console.log("transition to be remvoed", minimizedTrie.transitions[i]);
      //splice transition on index i

      minimizedTrie.transitions.splice(i, 1);
    }
  }
  for (let i = 0; i < minimizedTrie.transitions.length; i++) {
    if (
      !minimizedTrie.nodes.includes(minimizedTrie.transitions[i].currentNode)
    ) {
      console.log("transition to be remvoed", minimizedTrie.transitions[i]);
      minimizedTrie.transitions.splice(i, 1);
    }
  }

  minimizedTrie.finalNodes = minimizedTrie.nodes.filter((node) => {
    return trie.finalNodes.includes(node);
  });

  console.log("minimized trie", minimizedTrie);
  return minimizedTrie;
};
