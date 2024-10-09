class Node {
  constructor(rootValue = null) {
    this.left = null;
    this.right = null;
    this.value = rootValue;
  }
}

class Tree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (array.length === 0) {
      return null;
    }

    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let rootValue = new Node(array[mid]);

    rootValue.left = this.buildTree(array, start, mid - 1);
    rootValue.right = this.buildTree(array, mid + 1, end);

    return rootValue;
  }

  insert(value, currentNode){
    // base case: the obvious result is that if the the current node value is null, we assign that current node value the newNode
    // Otherwise: if the value is less than the node.value, we'll keep going down the left subtree, else if the value is greater than the node.value, we'll keep going down the right subtree

    if(currentNode === null){
      // If the node 'this.value' is null, we can attach the new node, else we keep going down depending on the condition
      return new Node(value);
    }

    if(currentNode === value){
      return currentNode;
    }

    if(value < currentNode.value){
      currentNode.left = this.insert(value, currentNode.left);
    }
    else if(value > currentNode.value){
      currentNode.right = this.insert(value,currentNode.right);
    }

    return currentNode;
  }

  deleteItem(value){

  }

  find(value, currentNode){
    // function that returns the node with the given value
    // Base case, if value === currentNode.value, return currentNode

    let foundNode;


    if(currentNode !== null && value === currentNode.value){
      foundNode = currentNode;
      return foundNode;
    }else if(currentNode === null){
      console.log('Node cannout be found');
      return false;
    }

    

    if(value < currentNode.value){
      currentNode.left = this.find(value, currentNode.left)
    }else if(value > currentNode.value){
      currentNode.right = this.find(value, currentNode.right)
    }

    return currentNode;
    

  }
}

function merge_sort(array) {
  if (array.length === 1) {
    return array;
  } else {
    let result = [];
    let cutArrayInHalf = Math.floor(array.length / 2);
    let leftHalf = merge_sort(array.slice(0, cutArrayInHalf));
    let rightHalf = merge_sort(array.slice(cutArrayInHalf));

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < leftHalf.length && j < rightHalf.length) {
      if (leftHalf[i] === rightHalf[j]) {
      }
      if (leftHalf[i] < rightHalf[j]) {
        result[k++] = leftHalf[0];
        i++;
      } else {
        result[k++] = rightHalf[j];
        j++;
      }
    }

    for (; i < leftHalf.length; i++) {
      result[k++] = leftHalf[i];
    }

    for (; j < rightHalf.length; j++) {
      result[k++] = rightHalf[j];
    }

    return result;
  }
}

// let not_sorted = [4, 3, 2, 1];

// let sorted = merge_sort(not_sorted);

let test1 = new Tree();

let returnNode = test1.buildTree([1,2,3,4,5,7]);


function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

prettyPrint(returnNode);

test1.insert(6, returnNode);


prettyPrint(returnNode);

test1.find(3, returnNode);