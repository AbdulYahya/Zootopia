export class Timestamp {
  private cTimestamp = Date.now();
  
  constructor() { }

  getTimestamp = () => {
    let timestamp = new Timestamp();
    return timestamp.cTimestamp;
  }
}
