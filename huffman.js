'use strict';

class HuffmanTree {
  constructor(values) {
    const frequencies = this.findFrequencies(values);
    this.tree = this.buildTree(frequencies);
  }

  findFrequencies(values) {
    const temp = [];
    const frequencies = [];
    for (const i of values) {
      temp[i] ? temp[i]++ : temp[i] = 1;
    }
    const tempSorted = Object.entries(temp).sort((a, b) => a[1] - b[1]);
    tempSorted.forEach(([key, value]) =>
      frequencies.push({ frequency: value, value: key }));
    return frequencies;
  }

  sortFrequencies(frequencies) {
    return frequencies.sort((a, b) => a.frequency - b.frequency);
  }

  buildTree(frequencies) {
    while (frequencies.length > 1) {
      const leftNode = frequencies.shift();
      const rightNode = frequencies.shift();
      const newNode = {
        left: leftNode,
        right: rightNode,
        value: null,
        frequency: leftNode.frequency + rightNode.frequency
      };
      frequencies.unshift(newNode);
      frequencies = this.sortFrequencies(frequencies);
    }
    return frequencies[0];
  }

  encode(plainString) {
    const binaryEncoding = plainString
      .split('')
      .map((character) => this.encodeCharacter(character, this.tree, []))
      .join('');
    return binaryEncoding;
  }

  encodeCharacter(character, node, encodedBinaryArray) {
    if (node === undefined) return null;
    if (node.value === character) {
      return encodedBinaryArray.join('');
    }
    const leftSearch = this
      .encodeCharacter(character, node.left, encodedBinaryArray.concat(['0']));
    if (leftSearch) return leftSearch;
    const rightSearch = this
      .encodeCharacter(character, node.right, encodedBinaryArray.concat(['1']));
    if (rightSearch) return rightSearch;
    return null;
  }
  
  decode(binaryString) {
    let outputString = '';
    let currentNode = this.tree;
    for (const char of binaryString) {
      currentNode = char === '0' ? currentNode.left :
        currentNode.right;
      if (currentNode.value !== null) {
        outputString += currentNode.value;
        currentNode = this.tree;
      }
    }

    return outputString;
  }

  toString() {
    return JSON.stringify(this.tree);
  }

}

module.exports = HuffmanTree;
