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

  deleteMaxPriority() {
    if (this.arr.length == 0)
      return -1
    let max = this.arr[0]
    this.arr = this.arr.slice(1, this.arr.length)
    this.callHeapify()
    return max.val
  }
}

function heapify(arr, parentInd, comparator) {
  let largestInd = parentInd
  //if child exists and is greater than parent
  if (arr.length > parentInd + 1 && comparator(arr[parentInd + 1].priority, arr[parentInd].priority)) { //child greater retur true
    largestInd = parentInd + 1
  }
  if (arr.length > parentInd + 2 && comparator(arr[parentInd + 2].priority, arr[parentInd].priority) &&
    comparator(arr[parentInd + 2].priority, arr[largestInd].priority)) {
    largestInd = parentInd + 2
  }
  if (largestInd != parentInd) {
    arr = swap(arr, largestInd, parentInd)
    arr = heapify(arr, largestInd, comparator)
  }
  return arr
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
  return arr
}

module.exports = Heap