# priority-queue-v2

Published at - https://www.npmjs.com/package/priority-queue-v2
<h2>Operations supported - </h2>

queue - add an element to the queue<br/>
dequeue - delete the max priority element from the queue<br/>
isEmpty - returns true/false<br/>
clear - clear the queue<br/>
delete - If we need to update the priority, delete that item and insert it in again <br/>
list - contents of heap<br/>

The Item stored in the queue should be class and a comparator should be provided.<br/>

<h2>Examples -  </h2>

<h3>1. If values in a queue are strings, comparator will receive priorities as a and b in the example below</h3>
We need max priority element to be removed first.

let comparator = function (a, b) {<br/>
  return a >= b ? false : true<br/>
}<br/>

<pre>
An example would be - <br/>

const PriorityQueue = require('../index.js').priorityQueue

let obj = new PriorityQueue(comparator)
obj.queue('c', 1)
obj.queue('b', 3)
obj.queue('a', 5)

console.log(obj.dequeue()) //'a'
</pre><br/>

<h3>2. If values in the queue is an object, comparator will receive the object and you need to compare priorities as seen below - </h3>

<pre>
class Box {
  constructor(w, l) {
        this.w = w
        this.l = l
        this.area = w * l //this is priority
  }

  comparator(a, b) {
        return a.area >= b.area ? false : true
  }
}
    
    let obj = new PriorityQueue(Box.prototype.comparator)
    obj.queue(new Box(5, 5))
    obj.queue(new Box(2, 3))
    obj.queue(new Box(3, 3))
    obj.queue(new Box(9, 9))
    
    assert.deepEqual(obj.dequeue(), new Box(9, 9))
    assert.deepEqual(obj.dequeue(), new Box(5, 5))

</pre>









