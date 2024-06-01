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
    
    if(array.length === 0){
      return null;
    }

    if(start > end) return null;

    let mid = Math.floor((start + end)/2);

    console.log(mid);
    let rootValue = new Node(array[mid]);



    rootValue.left = this.buildTree(array, start, mid-1);
    rootValue.right = this.buildTree(array, mid+1, end);



    return rootValue;
  }

  insert(value){
    // value is X, the node to be inserted
    //we need to compare the root to X, if root < X, go left, else go right

    let root = this.root;

    console.log(root);

  }

  deleteItem(value){

  }
}
//we need a sort method which include to remove duplicates of an array

function merge_sort(array){
  if(array.length === 1){
    return array;
  }else{
    let result = [];
    let cutArrayInHalf = Math.floor(array.length/2);
    let leftHalf = merge_sort(array.slice(0, cutArrayInHalf));
    let rightHalf = merge_sort(array.slice(cutArrayInHalf));
    
    let i = 0;
    let j = 0;
    let k = 0;

    while( i < leftHalf.length && j < rightHalf.length){
      if(leftHalf[i] === rightHalf[j]){

      }
      if(leftHalf[i] < rightHalf[j]){
        result[k++] = leftHalf[0];
        i++;
      }else{
        result[k++] = rightHalf[j];
        j++;
      }
    }

    for(; i < leftHalf.length; i++){
      result[k++] = leftHalf[i];
    }

    for(; j < rightHalf.length; j++){
      result[k++] = rightHalf[j];
    }

    return result;
  }
}

let not_sorted = [4, 3,2,1, ];

let sorted = merge_sort(not_sorted);

let test1 = new Tree(sorted);

console.log("Logging Tree...");
console.log(test1.root.right.right);


console.log("\n SPACE\n");


function prettyPrint(node, prefix = "", isLeft = true){
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(test1.root)
