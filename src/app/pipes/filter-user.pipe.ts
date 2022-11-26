import { Pipe, PipeTransform } from '@angular/core';
import { LendBooks } from '../models/lendBooks';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: LendBooks[], searchedWord:string) {
    if(!searchedWord) return value;//filtrelenecek input değeri yoksa diziyi geri dön

    return value.filter((user) => user.user_email.toLocaleLowerCase().includes(searchedWord.toLowerCase()));
  }

}
