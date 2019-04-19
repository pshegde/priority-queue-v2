'use strict'

const assert = require('assert')
const PriorityQueue = require('../index.js').priorityQueue
const Item = require('../src/Item')

//a is parent b is child
let comparator = (a, b) => {
  return a >= b ? false : true
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

  it('list the contents of the queue', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('c', 1)
    obj.queue('b', 3)
    obj.queue('a', 5)
    assert.deepEqual(obj.list(), [new Item('a', 5),
    new Item('c', 1),
    new Item('b', 3)])
  })

  it('test with an object', () => {
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
    assert.throws(() => { obj.queue(new Box(3, 3)) }, /^Error: Element already exists, call delete before adding!$/)
    assert.deepEqual(obj.dequeue(), new Box(9, 9))
    assert.deepEqual(obj.dequeue(), new Box(5, 5))
    assert.deepEqual(obj.dequeue(), new Box(3, 3))
    assert.deepEqual(obj.dequeue(), new Box(2, 3))
  })
})
