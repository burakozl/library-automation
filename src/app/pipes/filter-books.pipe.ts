import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'filterBooks'
})
export class FilterBooksPipe implements PipeTransform {

  transform(value: Book[], searchedWord:string) {
    if(!searchedWord) return value;//filtrelenecek input değeri yoksa listeyi geri dön

    return value.filter((book) => book.bookName.toLocaleLowerCase().includes(searchedWord.toLowerCase()));//girilen input değeri book name içersinde varsa return et...
    //büyük küçük harf duyarlılığı olmaması için gelen değerler lowercase ile tamamı küçük harfe çevrildi

  }

}
