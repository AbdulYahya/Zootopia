import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from './models/animal.model';

@Pipe({
  name: 'age',
  pure: false
})

export class AgePipe implements PipeTransform {
  output: Animal[] = [];

  transform(input: Animal[], filterByAge) {
    switch (filterByAge) {
      case (filterByAge < 2):
        this.output = input.filter((animal, array) => {
          return (animal.age === filterByAge) ? animal : null;
        });

        return this.output;

      case (filterByAge >= 2):
        this.output = input.filter((animal, array) => {
          return (animal.age === filterByAge) ? animal : null;
        });

        return this.output;

      default:
        return input;
    }
  
  }
}
