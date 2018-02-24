export class Animal {
  constructor(
    public species: string,
    public name: string,
    public age: number,
    public diet: string,
    public location: string,
    public caretakers: number,
    public sex: string,
    public likes: string, // public likes: []?  have user separate input with commas then split string into an array?
    public dislikes: string, // public dislikes: []?
  ) {
    // let timestamp = Date.now(); // Check this
 }
}
