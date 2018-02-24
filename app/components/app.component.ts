import { Component } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-root',
  templateUrl: './build/app.view.html'
})

export class AppComponent {
  animalTemplate: Animal = new Animal(null, null, null, null, null, null, null, null, null); // Required to make Angular2's ngModel work
  masterAnimalList: Animal[] = [];
  submitted: boolean = false;
  currentAnimal = null;
  currentTimestamp = setInterval(() => { Date.now(); }, 1000);

  editAnimal(currentAnimal) { this.currentAnimal = currentAnimal; }

  finishedEditingAnimal() { this.currentAnimal = null; }

  addNewAnimal(newAnimalFromChild: Animal) { this.masterAnimalList.push(newAnimalFromChild); }

  onDone() { this.submitted = this.submitted ? false : true; }
}
