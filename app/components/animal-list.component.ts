import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'animal-list',
  templateUrl: './build/animal-list.view.html'
})

export class AnimalListComponent {
  @Input() childAnimalList: Animal[];
  @Output() editRequest = new EventEmitter();

  editRequested(animalToEdit: Animal) {
    this.editRequest.emit(animalToEdit);
  }
}
