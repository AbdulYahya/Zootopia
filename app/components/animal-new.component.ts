import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'animal-new',
  templateUrl: './build/animal-new.view.html'
})

export class AnimalNewComponent {
  @Input() childAnimalToAdd: Animal;
  @Input() childDone: boolean;
  @Output() submitAnimalNewFormRequest = new EventEmitter();
  @Output() doneAnimalNewFormRequest = new EventEmitter();

  submitAnimalNewForm(species: string, name: string, age: number, diet: string,
                        location: string, caretakers: number, sex: string, likes: string,
                        dislikes: string) {
    let newAnimalToAdd: Animal = new Animal(species, name, age, diet,
                                              location, caretakers, sex, likes,
                                              dislikes);
    this.submitAnimalNewFormRequest.emit(newAnimalToAdd);
  }

  doneAnimalNewForm() { this.doneAnimalNewFormRequest.emit(); }
}
