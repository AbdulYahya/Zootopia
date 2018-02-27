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
      case 'youngFilter':
        this.output = input.filter((animal, array) => {
          return (animal.age < 2) ? animal : null;
        });
        console.log(this.output);
        return this.output;

      case 'matureFilter':
        this.output = input.filter((animal, array) => {
          return (animal.age >= 2) ? animal : null;
        });

        return this.output;

      default:
        return input;
    }
  }
}
