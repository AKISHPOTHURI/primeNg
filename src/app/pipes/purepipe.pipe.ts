import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinArray',
  // pure: false
  pure:true
})
export class PurepipePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.join();
  }

}
