import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from './models/animal.model';

@Pipe({
  name: 'sex',
  pure: false
})

export class SexPipe implements PipeTransform {
  output: Animal[] = [];

  transform(input: Animal[], filterBySex) {
    switch (filterBySex) {
      case 'fe':
        this.output = input.filter((animal) => {
          return (animal.sex === 'female') ? animal : null
        });
        return this.output;
      case 'ma':
        this.output = input.filter((animal) => {
          return (animal.sex === 'male') ? animal : null
        });
        return this.output;
      default:
        return input;
    }
  }
}
