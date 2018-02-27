import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Timestamp } from '../models/timestamp.model';

@Component({
  selector: 'animal-new',
  templateUrl: './build/animal-new.view.html'
})

export class AnimalNewComponent {
  @Input() childAnimalToAdd: Animal;
  @Output() submitAnimalNewFormRequest = new EventEmitter();

  submitAnimalNewForm(species: string, name: string, age: number, diet: string,
                        location: string, caretakers: number, sex: string, likes: string,
                        dislikes: string) {
    let newAnimalToAdd: Animal = new Animal(species, name, age, diet,
                                              location, caretakers, sex, likes,
                                              dislikes);
    this.submitAnimalNewFormRequest.emit(newAnimalToAdd);
  }

}
