import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';;
import { Timestamp } from '../models/timestamp.model';

@Component({
  selector: 'animal-edit',
  templateUrl: './build/animal-edit.view.html'
})

export class AnimalEditComponent {
  @Input() childAnimalToEdit: Animal;
  @Input() childTimestamp: Timestamp;
  @Output() editFinishedRequest = new EventEmitter();

  editFinishedRequested() { this.editFinishedRequest.emit(); }

  hasBeenEdited() { this.childAnimalToEdit.edited = true; }
}
