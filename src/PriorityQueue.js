'use strict'

//implement using heap

const _ = require('lodash')
const Heap = require('./Heap.js')
const Item = require('./Item.js')

class PriorityQueue {
  constructor(comparator, allowDuplicates=false) {
    if (!comparator)
      throw new Error('need to provide comparator')
    this.heap = new Heap(comparator)
    this.allowDuplicates = allowDuplicates
  }

  queue(k, priority) {
    //if k already present then error
    if (!this.allowDuplicates && _.find(this.heap.arr, v => _.isEqual(v.val, k)))
      throw new Error('Element already exists, call delete before adding!')
    this.heap.insert(new Item(k, priority))
  }

  dequeue() {
    return this.heap.poll()
  }

  clear() {
    this.heap.arr = []
  }

  isEmpty() {
    return this.heap.arr.length == 0
  }

  peek() {
    return this.heap.peek()
  }

  delete(k) { //cannot update so we need to delete an item; before requeing it
    let ind = _.findIndex(this.heap.arr, v => _.isEqual(v.val, k))
    if (ind > -1) {
      this.heap.arr.splice(ind, 1)
      this.heap.callHeapify()
    } else
      throw new Error('key does not exist!')
  }

  list() {
    return !this.heap.arr ? this.heap.arr : this.heap.arr.map(e => e.val)
  }
}
module.exports = PriorityQueue
