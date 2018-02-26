import { Component } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Timestamp } from '../models/timestamp.model';

@Component({
  selector: 'app-root',
  templateUrl: './build/app.view.html'
})

export class AppComponent {
  masterAnimalList: Animal[] = [];
  cTimestamp: Timestamp = new Timestamp();
  
  // Required to make Angular2's ngModel work
  animalTemplate: Animal = new Animal(null, null, null, null, null, null, null, null, null);
  currentAnimal = null;

  editAnimal(currentAnimal) { this.currentAnimal = currentAnimal; }

  finishedEditingAnimal() { this.currentAnimal = null; }

  addNewAnimal(newAnimalFromChild: Animal) { this.masterAnimalList.push(newAnimalFromChild); }

}
