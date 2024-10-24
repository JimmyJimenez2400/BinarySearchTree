class Node {
  constructor(rootValue = null) {
    this.left = null;
    this.right = null;
    this.value = rootValue;
  }
}

class Tree {
  constructor(array = []) {

    if(array.length > 0){
      this.root = this.buildTree(array);
      console.log('Tree initialized with root:', this.root);  // Add logging
    }else{
      this.root = null;
      console.log('Empty tree')
    }
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


  insert(value){
    if(this.root === null){
      return new Node(value);
    }

    let updatedTree = this.insertRecursionHelper(this.root, value);
    
    return updatedTree;
  }

  insertRecursionHelper(currentNode, value){
    if(currentNode === null){
      return new Node(value);
    }

    if(currentNode.value === value){
      return currentNode;
    }

    if(value < currentNode.value){
      currentNode.left = this.insertRecursionHelper(currentNode.left, value);
    }else if(value > currentNode.value){
      currentNode.right = this.insertRecursionHelper(currentNode.right, value);
    }

    return currentNode;
  }
  
  deleteItem(value){
    if(this.root === null){
      return this.root;
    }

    return this.deleteItemRecursionHelper(this.root, value);
  }

  deleteItemRecursionHelper(currentNode, value){
    if(currentNode === null){
      return currentNode;
    }

    if(value < currentNode.value){
      currentNode.left = this.deleteItemRecursionHelper(currentNode.left, value);
    }else if(value > currentNode.value){
      currentNode.right = this.deleteItemRecursionHelper(currentNode.right, value);
    }else{
      //case 1 - no children or only right child
      if(currentNode.left === null){
        return currentNode.right;
      }
      //case 2 - only left child
      if(currentNode.right === null){
        return currentNode.left;
      }
      
      //case 3 - both children present
      let successor = this.getSuccessor(currentNode);
      currentNode.value = successor.value;
      currentNode.right = this.deleteItemRecursionHelper(currentNode.right, successor.value);
    }
    return currentNode;
  }

  getSuccessor(currentNode){
    currentNode = currentNode.right;
    while(currentNode !== null && currentNode.left !== null){
      currentNode = currentNode.left;
    }
    return currentNode;
  }


  find(value){
    // function that returns the node with the given value
    // Base case, if value === currentNode.value, return currentNode
    if(this.root === null){
      return null;
    }

    return this.findRecursionHelper(value, this.root);
      
  }

  findRecursionHelper(value, node){
    if(node.value === value){
      console.log(node);
      return node;
    }

    if(value < node.value){
      node = this.findRecursionHelper(value, node.left);
    }else if(value > node.value){
      node = this.findRecursionHelper(value, node.right);
    }

    return node;
  }

  levelOrder(){
    let result = [];
    let root;

    if(callback === undefined){
      throw new Error("Callback function is required");
    }

    if(root === null){
      return arrQueue; 
    }

    while(arrQueue !== null){
      arrQueue.push(node);
    }

    console.log(root);

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

let test1 = new Tree([1,2,3,4,5,7]);


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


console.log("BEFORE INSERT:");
prettyPrint(test1.root);


test1.insert(6);


console.log("AFTER INSERT:");
prettyPrint(test1.root);

test1.insert(5000);


console.log("AFTER INSERT:");
prettyPrint(test1.root);


test1.deleteItem(6);

prettyPrint(test1.root);

test1.deleteItem(2);

prettyPrint(test1.root);

test1.deleteItem(5);

prettyPrint(test1.root);

test1.find(4);
