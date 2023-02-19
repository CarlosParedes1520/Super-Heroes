import { Pipe, PipeTransform } from '@angular/core';
import { DataHeroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(value: DataHeroes): string {

    console.log('Pipe prosesadó');
    
    if (!value.id) {
      return 'assets/no-image.png'
    }else if (value.alt_img) {
      return value.alt_img
    }
    
    return  `assets/heroes/${value.id}.jpg`
  }

}
