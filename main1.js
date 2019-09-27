let fills = document.querySelectorAll('.fill');
let empties = document.querySelectorAll('.empty');

// Fill listeners
console.log(fills);
console.log(empties);


for (let fill of fills){
  fill.addEventListener('dragstart', dragStart);
  fill.addEventListener('dragend', dragEnd);
}
// Loop through empty boxes and add listeners
for (let empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
  let temp = fills
  console.log(1);
  temp = this.id;
  console.log(temp + "aks");
  this.className += ' hold';
  return temp;
}

function dragEnd() {
  console.log(2);
  this.className = 'fill';
}

function dragOver(e) {
  console.log(3);
  e.preventDefault();
}

function dragEnter(e) {
  console.log(4);
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  console.log(5);
  this.className = 'empty';
}

function dragDrop(e) {
  dragStart();
  this.className = 'empty';
  this.append();
}
