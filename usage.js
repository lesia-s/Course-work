'use strict';

const HuffmanTree = require('./huffman.js');

const string = 'In computer science and information theory, a Huffman code is\
 a particular type of optimal prefix code that is commonly used for lossless\
 data compression.';
const symbols = string.split('');

const huffman = new HuffmanTree(symbols);

const tree = huffman.toString();
console.log('Huffman tree: ' + tree);

const encoded = huffman.encode(symbols.join(''));
console.log('Encoded string: ' + encoded);

const decoded = huffman.decode(encoded);
console.log('Decoded string: ' + decoded);
