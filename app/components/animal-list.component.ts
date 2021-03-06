import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Timestamp } from '../models/timestamp.model';

@Component({
  selector: 'animal-list',
  templateUrl: './build/animal-list.view.html'
})

export class AnimalListComponent {
  @Input() childAnimalList: Animal[];
  @Input() childTimestamp: Timestamp;
  @Output() editRequest = new EventEmitter();

  filterByAge: string = "noFilter";
  filterBySex: string = 'other';

  onAgeChange(optionFromMenu) {
    this.filterByAge = optionFromMenu;
  }

  onSexChange(optionFromMenu) {
    this.filterBySex = optionFromMenu;
  }

  editRequested(animalToEdit: Animal) { this.editRequest.emit(animalToEdit); }
}
