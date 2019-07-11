import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(array, value: string) {
    if (value) {
      return array.filter(array => {
        if (array.name) {
          return (array.name.toLowerCase()).includes(value.toLowerCase());
        } else if (array.info) {
          return (array.info.toLowerCase()).includes(value.toLowerCase());
        }
      });
    } else {
      return array;
    }
  }
}
