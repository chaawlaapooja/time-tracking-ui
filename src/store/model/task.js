class Task {
    constructor(_id, name, tags, startTime, endTime, createdAt) {
      this._id = _id;
      this.name = name;
      this.tags = tags;
      this.startTime = startTime;
      this.endTime = endTime;
      this.createdAt = createdAt
    }
  }
  
  export default Task;