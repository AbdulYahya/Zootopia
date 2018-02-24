import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal.model';;

@Component({
  selector: 'animal-edit',
  templateUrl: './build/animal-edit.view.html'
})

export class AnimalEditComponent {
  @Input() childAnimalToEdit: Animal;
  @Input() childCurrentTimestamp; // = setInterval(() => Date.now(), 10);
  @Output() editFinishedRequest = new EventEmitter();

  editFinishedRequested() { this.editFinishedRequest.emit(); }

  hasBeenEdited() { this.childAnimalToEdit.edited = true; }


  t = console.log(this.childCurrentTimestamp);
}
