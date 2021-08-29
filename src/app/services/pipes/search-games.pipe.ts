import {Pipe, PipeTransform} from '@angular/core';
import {Game} from '../../interfaces';

@Pipe({
  name: 'searchGames'
})
export class SearchGames implements PipeTransform {
  transform(games: Game[], search = ''): Game[] {
    if (!search.trim()) {
      return games
    }

    return games.filter(game => {
      return game.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
