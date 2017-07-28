class Queue {
  constructor(ele){
    if (ele instanceof Array) {
			this.items = ele;
		} else {
			this.items = [];
		}
		this.length = this.items.length;
  }

  enqueue(ele){
    this.length += 1;
		return this.items.push(ele);
  }

  dequeue(){
    if (this.length > 0) {
			this.length -= 1;
		}
		return this.items.shift();
  }
}

export default Queue;
