import { Timestamp } from '../models/timestamp.model';

export class Animal {
  private time: Timestamp = new Timestamp();

  public timestamp: number = this.time.getTimestamp();
  public edited: boolean = false;

  constructor(
    public species: string,
    public name: string,
    public age: number,
    public diet: string,
    public location: string,
    public caretakers: number,
    public sex: string,
    public likes: string, // public likes: []?  have user separate input with commas then split string into an array?
    public dislikes: string // public dislikes: []?
  ) { }
}
