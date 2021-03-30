import assert from 'assert'
import PriorityQueue from '../PriorityQueue.js'
import isEqual from 'lodash.isequal'


// a is parent b is child
// sort in descending order
function comparator (a, b) {
  return a < b ? true : false // swap true
}


describe('test', () => {
  it('basic test', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('d', 1)
    obj.queue('a', 4)
    obj.queue('b', 3)
    obj.queue('c', 2)

    assert.equal(obj.dequeue().val, 'a') //4
    assert.equal(obj.dequeue().val, 'b')
    assert.equal(obj.dequeue().val, 'c')
    assert.equal(obj.dequeue().val, 'd')
    assert.equal(obj.dequeue(), undefined)
  })

  it('if queue is empty then dequeue undefined', () => {
    let obj = new PriorityQueue(comparator)
    assert.equal(obj.dequeue(), undefined)
  })


  it('adding a duplicate element in queue re-queues it', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('e', 1)
    obj.queue('f', 2)
    obj.queue('e', 3)

    assert.deepEqual(obj.list()[0], { val: 'e', priority: 3 })
  })

  it('throw an error if we try to delete a key that doesnt exist', () => {
    let obj = new PriorityQueue(comparator)
    assert.throws(() => { obj.delete('3') }, /^Error/) //delete key that doesnt exist
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

    assert.deepEqual(obj.list(), [
      { val: 'a', priority: 5 },
    { val: 'c', priority: 1 },
    { val: 'b', priority: 3 }
    ])
  })

  it('should peek content of queue', () => {
    let obj = new PriorityQueue(comparator)
    obj.queue('c', 1)
    obj.queue('b', 3)

    assert.deepEqual(obj.peek(), { val: 'b', priority: 3 })
  })

  describe('test with an object', () => {
    it('basic test', () => {
      let obj = new PriorityQueue(Box.prototype.comparator)
      obj.queue(new Box(5, 5))
      obj.queue(new Box(2, 3))
      obj.queue(new Box(3, 3))
      obj.queue(new Box(9, 9))

      assert.deepEqual(obj.peek(), new Box(9, 9))
      assert.deepEqual(obj.dequeue(), new Box(9, 9))
      assert.deepEqual(obj.dequeue(), new Box(5, 5))
      assert.deepEqual(obj.dequeue(), new Box(3, 3))
      assert.deepEqual(obj.dequeue(), new Box(2, 3))
    })

    it('test peek', () => {
      let obj = new PriorityQueue(Box.prototype.comparator)
      obj.queue(new Box(5, 5))
      obj.queue(new Box(9, 9))

      assert.deepEqual(obj.peek(), new Box(9, 9))
    })

    it('throw an error if we try to delete a key that doesnt exist', () => {
      let obj = new PriorityQueue(comparator)
      obj.queue(new Box(15, 5))
      assert.throws(() => { obj.delete(new Box(15, 51)) }, /^Error/) // delete key that doesnt exist
    })

    it('should update priority of existing object when re-queueing', () => {
      let obj = new PriorityQueue(comparator)

      const tmp = new Box(2, 3)
      obj.queue(new Box(5, 5))
      obj.queue(tmp)
      obj.queue(new Box(3, 3))
     
      obj.queue(tmp)
      assert(isEqual(obj.list()[2], tmp))
    })
  })
})

class Box {
  constructor(w, l) {
    this.w = w
    this.l = l
    this.area = w * l // this is priority
  }

  comparator(a, b) {
    return a.area >= b.area ? false : true
  }
}