import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit, OnDestroy {

  
  games: Game[] = []
  pSub!: Subscription
  searchStr = ''

  constructor(
    private gamesService: GamesService,
    ) {
  }

  ngOnInit() {
    this.pSub = this.gamesService.getAll().subscribe(games => {
      this.games = games
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

  }


}
