# priority-queue-v2


Operations supported - 

queue - add an element to the queue
dequeue - delete the max priority element from the queue
isEmpty - returns true/false
clear - clear the queue
delete - If we need to update the priority, delete that item and insert it in again 

The Item stored in the queue should be class and a comparator should be provided.

let comparator = function (a, b) {
  return a.area < b.area ? false : true
}

An example would be - 

let obj = new PriorityQueue(comparator)
obj.queue('c', 1)
obj.queue('b', 3)
obj.queue('a', 5)

console.log(obj.dequeue()) //'a'




