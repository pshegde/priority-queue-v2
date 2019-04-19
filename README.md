# priority-queue-v2


Operations supported - 

queue - add an element to the queue<br/>
dequeue - delete the max priority element from the queue<br/>
isEmpty - returns true/false<br/>
clear - clear the queue<br/>
delete - If we need to update the priority, delete that item and insert it in again <br/>

The Item stored in the queue should be class and a comparator should be provided.<br/>


let comparator = function (a, b) {<br/>
  return a.area < b.area ? false : true<br/>
}<br/>



An example would be - <br/>

let obj = new PriorityQueue(comparator)<br/>

obj.queue('c', 1)<br/>

obj.queue('b', 3)<br/>

obj.queue('a', 5)<br/>


console.log(obj.dequeue()) //'a'<br/>





