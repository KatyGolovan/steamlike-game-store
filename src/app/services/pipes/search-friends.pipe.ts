import {Pipe, PipeTransform} from '@angular/core';
import {Friend} from '../../interfaces';

@Pipe({
  name: 'searchFriends'
})
export class SearchFriends implements PipeTransform {
  transform(friends: Friend[], search = ''): Friend[] {
    if (!search.trim()) {
      return friends
    }

    return friends.filter(friend => {
      return friend.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
