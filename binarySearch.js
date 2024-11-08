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

  levelOrder(callback){

    // base case
    if(this.root === null){
      return [];
    }

    if(callback === undefined){
      throw new Error("Callback must be provided");
    }

    // breadth-first level levelOrder
    //When visiting a node, we can add the node to the "Queue"
    let queue = [];
    queue.push(this.root);


    while(queue.length > 0){
      let current = queue.shift();
      console.log(current.value);
      callback(current);

      if(current.left !== null){
        console.log("Pushing to queue (left): ");
        console.log(current.left.value);
        queue.push(current.left);
      }
      if(current.right !== null){
        console.log("Pushing to queue (right): ");
        console.log(current.right.value);
        queue.push(current.right);
      }

      console.log(queue);
    }
  }

  inOrder(callback){
    if(!this.root){
      return [];
    }

    if(!callback){
      throw new Error("Please provide a callback");
    }


    let stack = [];
    let currentNode = this.root;

    let result = [];

   while(currentNode !== null || stack.length > 0){

    // visits left subtree until currentNode is null
    while(currentNode !== null){
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    //we pop to visit the last node in our stack array to visit it's value
    currentNode = stack.pop();
    result.push(currentNode.value);
    callback(currentNode);

    currentNode = currentNode.right;
   }

   return result;
  }

  preOrder(callback){

    if(!this.root){
      return [];
    }

    if(!callback){
      throw new Error("Callback must be provided");
    }

    let stack = [this.root];
    // push node.values
    let result = [];


    while(stack.length > 0){
      const node = stack.shift();

      // visit the Node
      result.push(node.value)
      callback(node);
      // visit the left subtree
      if(node.left !== null){
        stack.push(node.left);
      }
      // visit the right subtree
      if(node.right !== null){
        stack.push(node.right);
      }
    }

    return result;
  }

  postOrders(callback){

    let result = [];

    if(!this.root){
      return result;
    }

    this.postOrderRecursive(callback, this.root, result);
  }

  postOrderRecursive(callback, node, result =[]){
    if(!node) {
      return; // Base case to stop recursion
    }

    this.postOrderRecursive(callback, node.left, result);
    this.postOrderRecursive(callback, node.right, result);

    result.push(node.value);

    if(callback) callback(result);

    return result;
  }


  postOrder(callback){
    if(!this.root){
      return [];
    }

    let stack = [];
    let result = [];
    let currentNode = this.root;
    let lastVisited = null;

    while(currentNode !== null || stack.length > 0){
      if(currentNode !== null){
        stack.push(currentNode);
        currentNode = currentNode.left;
      }else{
        let peekNode = stack[stack.length - 1];

        if(peekNode.right !== null && lastVisited !== peekNode.right){
          currentNode = peekNode.right;
        }else{
          stack.pop();
          result.push(peekNode.right);

          lastVisited = peekNode;
        }
      }

    }
    

  }

  height(node){

  }

  depth(node){

  }

  isBalanced(node){

  }

  rebalance(node){

  }


}

function merge_sort(array) {
  if (array.length <= 1) {
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
      if (leftHalf[i] < rightHalf[j]) {
        result[k++] = leftHalf[i++];
        
      } else {
        result[k++] = rightHalf[j++];
    
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


let sorted = merge_sort([1,5,2,3,6]);
console.log("Sorting...");
console.log(sorted);

let test1 = new Tree([1,2,3,4,5,6,7,8,9,10,11]);


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

prettyPrint(test1.root);
function displayData(data){
  console.log("Displaying data:");
  console.log(data);
}

// test1.inOrder(displayData);
// test1.preOrder(displayData);
test1.postOrders();
