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

    let rootValue = new Node(array[mid]);



    rootValue.left = this.buildTree(array, start, mid-1);
    rootValue.right = this.buildTree(array, mid+1, end);



    return rootValue;
  }

  insert(value){
    // value is X, the node to be inserted
    //we need to compare the root to X, if root < X, go left, else go right
    let newNode = new Node(value);

    if(this.root === null){
      this.root = newNode;

      return this.root;
    }

    let currentNode = this.root;

    while(currentNode){

      if(value < currentNode.value){
        if(currentNode.left === null){
          currentNode.left = newNode;
          break;
        }else{
          currentNode = currentNode.left;
        }
      }else if(value > currentNode.value){
        if(currentNode.right === null){
          currentNode.right = newNode;
        }else{
          currentNode = currentNode.right;
        }
      }else{
        break;
      }


      
    }

    return this.root;
    
  }

  deleteItem(value){
    let currentNode = this.root;
    let parentNode = null;


    while(currentNode){
      if(value < currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.left;
      }else if(value > currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.right;
      }else if(value === currentNode.value){
        //base case 1
        if(currentNode.left === null && currentNode.right === null){
          if(parentNode.left.value === value){
            parentNode.left = null;
          }else if(parentNode.right.value === value){
            parentNode.right = null;
          }else{
            return this.root;
          }
          
        }
        else if((currentNode.left === null && currentNode.right !== null) || (currentNode.right === null && currentNode.left !== null)){
          if(currentNode.left !== null && currentNode.right === null){
            console.log("_________________ LEFT NOT NULL");
            parentNode.left = currentNode.left;
            currentNode = parentNode.left;
   

          }else if(currentNode.right !== null && currentNode.left === null){
            console.log("__________________ RIGHT NOT NULL");
            parentNode.right = currentNode.right;
            currentNode = parentNode.right;
          }
        }else{
          return this.root;
        }
        break;
      }
    }

    return currentNode;

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

let not_sorted = [4,3,2,1,];

let sorted = merge_sort(not_sorted);

let test1 = new Tree();


test1.insert(10);
test1.insert(5);
test1.insert(2);
test1.insert(3);
test1.insert(1);
test1.insert(20);



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



test1.insert(14);
test1.insert(11);

prettyPrint(test1.root);

test1.deleteItem(14);

prettyPrint(test1.root);
