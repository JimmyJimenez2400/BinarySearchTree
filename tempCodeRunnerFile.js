    rootValue.left = this.buildTree(array, start, mid-1);
    rootValue.right = this.buildTree(array, mid+1, end);