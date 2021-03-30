# priority-queue-v2

There are many priority queue implementations on the web, but I couldn't find any that meet these critera:
 * ** does not allocate lots of memory at run time**
 * has tests
 * is object oriented
 * is tiny! (~200 lines of code)
 * is a pure es module

So here we are!


## usage

Requires a modern browser or node >= v12.17.

```javascript
import PQ from 'priority-queue-v2'


// declarea a custom function for comparing the priority values of 2 items in the queue
function comparator (a, b) {
  return a < b ? true : false
}


// create a new priority queue that can hold a maximum of 20,000 items.
// by default max length is 1000
const MAX_LENGTH = 20000
const obj = new PQ(comparator, MAX_LENGTH)

// insert a few items
obj.queue('e', 1)
obj.queue('f', 9)
obj.queue('g', 4)

// get the highest priority item out of the queue
console.log(obj.dequeue()) // 'f'
console.log(obj.dequeue()) // 'g'
console.log(obj.dequeue()) // 'e'

// when the queue is empty it'll return undefined on dequeue
console.log(obj.dequeue()) // undefined
```


## API

* `queue` - add an element to the queue
* `dequeue` - delete the max priority element from the queue
* `isEmpty` - returns true/false
* `clear` - clear the queue
* `delete` - If we need to update the priority, delete that item and insert it in again
* `list` - contents of heap

The Item stored in the queue should be class and a comparator should be provided.


### If values in a queue are strings, comparator will receive priorities as a and b in the example below
We need max priority element to be removed first.

```javascript
const comparator = function (a, b) {
  return a >= b ? false : true
}
```

An example would be:
```javascript
const PQ = require('priority-queue-v2')
const obj = PriorityQueue.create(comparator)
PQ.queue(obj, 'c', 1)
PQ.queue(obj, 'b', 3)
PQ.queue(obj, 'a', 5)
console.log(PQ.dequeue(obj)) //'a'
```


### If values in the queue is an object, comparator will receive the object and you need to compare priorities

```javascript
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
    
const obj = PQ.create(Box.prototype.comparator)
const a = new Box(5, 5)
const b = new Box(9, 9)
PQ.queue(obj, a)
PQ.queue(obj, new Box(2, 3))
PQ.queue(obj, new Box(3, 3))
PQ.queue(obj, b)
assert.deepEqual(PQ.dequeue(obj), b)
assert.deepEqual(PQ.dequeue(obj), a)
```
