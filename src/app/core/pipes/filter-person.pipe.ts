import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterPerson'
})
export class FilterPersonPipe implements PipeTransform {
  transform(topics: any, term: any): any {

    if (term === undefined) {
      return topics;
    }

    return topics.filter(topic => {
      return topic.firstName.toLowerCase().includes(term.toLowerCase());
    });
  }
}
