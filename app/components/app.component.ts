import { Component } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-root',
  templateUrl: './build/app.view.html'
})

export class AppComponent {
  masterAnimalList: Animal[] = [
    new Animal('Gorilla', 'Samwise Gamgee', 8, 'Omnivore', 'Monkey Exhibit', 5, 'Male', 'Bananas', 'Humans'),
    new Animal('Canine', 'Shmitty', 12, 'Omnivore', 'Canine Exhibit', 2, 'Male', 'Apples', 'Any form of physical activity'),
    new Animal('Feline', 'Woof', 64, 'Omnivore', 'Feline Exhibit', 23, 'Female', 'Tomatoes', 'Talking')
  ];

  currentAnimal = null;

  editAnimal(currentAnimal) {
    this.currentAnimal = currentAnimal;
  }

  finishedEditingAnimal() {
    this.currentAnimal = null;
  }
}
