import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTable'
})
export class SearchTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {

      let rVal =
        val.id.toLowerCase().indexOf(value) !== -1 ||
        val.pname.toLowerCase().indexOf(value) !== -1;
        console.log(rVal)
      return rVal;
    });
  }

}
