import PQ from 'priority-queue'


export default class PriorityQueue {
  constructor(comparator, maxLength=1000) {
    if (!comparator)
      throw new Error('need to provide comparator')

    this.pq = PQ.create(comparator, maxLength)
  }

  queue(k, priority) {
    PQ.queue(this.pq, k, priority)
  }

  dequeue() {
    return PQ.dequeue(this.pq)
  }

  clear() {
    PQ.clear(this.pq)
  }

  isEmpty() {
    return PQ.isEmpty(this.pq)
  }

  peek() {
    return PQ.peek(this.pq)
  }

  delete(k) {
    PQ.delete(this.pq, k)
  }

  list() {
    return PQ.list(this.pq)
  }
}
