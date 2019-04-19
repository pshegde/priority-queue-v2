'use strict'

const assert = require('assert')
const PriorityQueue = require('../src/PriorityQueue')
let comparator = function (a, b) {
  return a <= b ? 0 : 1//sort is ascending order 1 means sort
}

describe('test', () => {
  it('basic test', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('d', 1)
    obj.queue('a', 4)
    obj.queue('b', 3)
    obj.queue('c', 2)

    assert.equal(obj.dequeue(), 'a') //4
    assert.equal(obj.dequeue(), 'b')
    assert.equal(obj.dequeue(), 'c')
    assert.equal(obj.dequeue(), 'd')
    assert.equal(obj.dequeue(), -1)
  })

  it('if queue is empty then dequeue -1', () => {
    let obj = new PriorityQueue(comparator)
    assert.equal(obj.dequeue(), '-1')
  })

  it('throw an error if we try to add a duplicate element in queue', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('e', 1)
    assert.throws(() => { obj.queue('e', 3) }, /^Error/) //duplicate element in queue 
  })

  it('throw an error if we try to delete a key that doesnt exist', () => {
    let obj = new PriorityQueue(comparator)
    assert.throws(() => { obj.delete('3') }, /^Error/) //delete key that doesnt exist
  })

  it('should delete before updating priority', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('e', 3)
    obj.queue('b', 1)
    obj.queue('a', 2) //max priority

    assert.throws(() => { obj.queue('a') }, /^Error/) //try to add key that exists already throws error
    obj.delete('a') //so we delete 
    obj.queue('a', 5)
    assert.equal(obj.dequeue(), 'a')
    assert.equal(obj.dequeue(), 'e')
    assert.equal(obj.dequeue(), 'b')
  })

  it('check if queue is empty', () => {
    let obj = new PriorityQueue(comparator)
    assert.equal(obj.isEmpty(), true)
  })

  it('clear the queue', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('a', 5)
    assert.equal(obj.isEmpty(), false)
    obj.clear()
    assert.equal(obj.isEmpty(), true)
  })
})
