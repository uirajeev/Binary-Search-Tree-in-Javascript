// Binary Serarch tree (BST)

// Binary Serarch tree constructor function
function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// Insert value in Binary Serarch tree
BST.prototype.insert = function(value) {
  if (value <= this.value) {
    if(!this.left) this.left = new BST(value);
    else this.left.insert(value);
  } else {
    if(!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
}

// Serarch value in BST
BST.prototype.findNode = function(value) {
  if (value === this.value) return this;
  else if (value < this.value) {
    if (!this.left) return false;
    else return this.left.findNode(value);
  } else if (value > this.value) {
    if (!this.right) return false;
    else return this.right.findNode(value);
  }
}

// Depth first traversal method
BST.prototype.depthFirstTraversal = function (iteratorDepth, order) {
  if (order === "pre-order") iteratorDepth(this.value);
  if (this.left) this.left.depthFirstTraversal(iteratorDepth, order);
  if (order === "in-order") iteratorDepth(this.value);
  if(this.right) this.right.depthFirstTraversal(iteratorDepth, order)
  if (order === "post-order") iteratorDepth(this.value);
}

// Breadth first  traversal method
BST.prototype.breadthFirstTraversal = function(iterator) {
  var queue = [this];
  while (queue.length) {
    treeNode = queue.shift();
    iterator(treeNode);
    if(treeNode.left) queue.push(treeNode.left);
    if(treeNode.right) queue.push(treeNode.right);
  }

}

function iteratorDepth(value) {
  console.log(value)
}
function iterator(value) {
  console.log(value.value)
}

// Delte node from binery tree
BST.prototype.delete = function(value) {
  let node = this.findNode(value);
  let parent = this.parent(value);
  
  // Case 1: No Child
  if (node.left === null && node.right === null) {
    if (value <= parent.value) parent.left = null;
    else parent.right = null;
    return node;
  }

  // Case 2: One Child 
  else if (node.left === null) {
    parent.right = node.right;
    return node;
  }
  // Case 2: One Child 
  else if (node.right === null) {
    parent.left = node.left;
    return node;
  }
  // Case 3: Two Child
  else {
    var temp = node.value;
    var rightMin = node.right.min();
    var minParent = node.parent(rightMin);
    node.value = rightMin;
    if (rightMin < minParent.value) {
       minParent.left = null;
       } else { 
        minParent.right = null;
      }
    return temp;
  }
}

// Get parent node
BST.prototype.parent = function (value) {

  if (this.value === value || this.left && this.left.value === value || this.right && this.right.value === value) return this;

  else if(value < this.value) return this.left.parent(value);

  else if(value > this.value) return this.right.parent(value);
}

// Get min value 
BST.prototype.min = function() {
  if(this.left) return this.left.min();
  else return this.value; 
}

// Get max value
BST.prototype.max = function() {
  if(this.right) return this.right.max();
  else return this.value;
}

// Create a binery Serarch tree
var bst = new BST(50);

// Insert value in Binery Serarch Tree
bst.insert(30);
bst.insert(20);
bst.insert(10);
bst.insert(45);
bst.insert(35);
bst.insert(70);
bst.insert(60);
bst.insert(59);
bst.insert(100);
bst.insert(85);
bst.insert(105);

// Check value contain
console.log(bst.findNode(70));

// Delete node from tree
console.log(bst.delete(70));

// Get parent node
console.log(bst.parent(50));

// Get min value
console.log(bst.min());

// Get Max Value
console.log(bst.max());

// De first
bst.depthFirstTraversal(iteratorDepth, "pre-order");

// Breadth first
bst.breadthFirstTraversal(iterator);

// Log Binery Serarch Tree
console.log(bst);
