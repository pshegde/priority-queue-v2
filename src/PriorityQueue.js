const Heap             = require('./Heap.js')
const removeArrayItems = require('remove-array-items')


// creates a new priority queue data structure
function create (comparator, maxLength=1000) {
  return Heap.create(comparator, maxLength)
}


function _findIndex (arr, length, needle) {
  for (let i=0; i < length; i++)
    if (arr[i].val === needle)
      return i
  return -1
}


function queue (heap, val, priority) {
  // if value already present then error
    if (_findIndex(heap.arr, heap.length, val) >= 0)
        throw new Error('Element already exists, call delete before adding!')

    Heap.insert(heap, { val, priority })
}


function dequeue (heap) {
  return Heap.poll(heap)
}


function clear (heap) {
  heap.length = 0
}


function isEmpty (heap) {
  return heap.length === 0
}


function peek (heap) {
  return Heap.peek(heap)
}


function del (heap, k) {
  const ind = _findIndex(heap.arr, heap.length, k)
  if (ind < 0)
    throw new Error('key does not exist!')

  removeArrayItems(heap.arr, ind, 1)
  heap.length--
    Heap.callHeapify(heap)
}


function list (heap) {
  if (!heap.length)
    return [ ]

  if (heap.arr[0].priority)
    return heap.arr.slice(0, heap.length)

  //return !this.heap.arr ? this.heap.arr : this.heap.arr[0].priority ? this.heap.arr : this.heap.arr.map(e => e.val)

  const result = [ ]
  for (let i=0; i < heap.length; i++)
    result[i] = heap.arr[i].val

  return result
}


module.exports = { create, queue, dequeue, clear, isEmpty, peek, delete: del, list }
