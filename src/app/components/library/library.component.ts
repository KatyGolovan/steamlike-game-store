import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})

export class LibraryComponent implements OnInit {
  games: Game[] = [];
  pSub!: Subscription;
  public shareAlert = "The Game URL has been copied";
  public downloadAlert = "The Game is dowloading";
  constructor(
    private gamesService: GamesService,
    ) {
  }

  ngOnInit() {
      this.pSub = this.gamesService.getAll().subscribe(games => {
          this.games = games.filter(game => game.bougth);
      });
  }
  public downloadFunc () {
    alert(this.downloadAlert);
  }

  public shareFunc () {
    alert(this.shareAlert);
  }

}