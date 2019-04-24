class Heap {
  constructor(comparator) {
    this.arr = []
    this.comparator = comparator
  }

  insert(item) {
    this.arr.push(item)
    this.callHeapify()
  }

  callHeapify() {
    let ind = this.arr.length - 1
    while (ind > 0) {
      if (ind % 2 == 0) {
        ind = (ind - 2) / 2
      } else {
        ind = (ind - 1) / 2
      }
      this.arr = heapify(this.arr, ind, this.comparator)
    }
  }

  poll() {
    if (this.arr.length == 0)
      return -1
    let max = this.arr[0]
    this.arr = this.arr.slice(1, this.arr.length)
    this.callHeapify()
    return max.priority ? max : max.val
  }

  peek() {
    if (this.arr.length == 0)
      return -1
    return this.arr[0].priority ? this.arr[0] : this.arr[0].val
  }
}

function heapify(arr, parentInd, comparator) {
  let largestInd = parentInd
  let leftChildInd = 2 * parentInd + 1
  let rightChildInd = 2 * parentInd + 2
  //if child exists and is greater than parent
  if (arr.length > leftChildInd && comparator(getValue(arr[parentInd]), getValue(arr[leftChildInd]))) { //child greater return true
    largestInd = leftChildInd
  }
  if (arr.length > rightChildInd && comparator(getValue(arr[largestInd]), getValue(arr[rightChildInd]))) {
    largestInd = rightChildInd
  }
  if (largestInd != parentInd) {
    arr = swap(arr, largestInd, parentInd)
    arr = heapify(arr, largestInd, comparator)
  }
  return arr
}

function getValue(obj) {
  return obj.priority ? obj.priority : obj.val //if priority is undefined then return val
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
  return arr
}

module.exports = Heap