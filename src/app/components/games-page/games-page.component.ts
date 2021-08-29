import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
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
  searchAction = ''
  searchSurvival = ''
  searchAdventure = ''
  searchHorror = ''
  searchSimulation = ''

  constructor(
    private gamesService: GamesService,
    public auth: AuthService
    ) {
  }
  public addToLibrary(id: string){}

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

  onChecked(event:any, str:string) {
    if (str === 'Action') {
        if (event.target.checked) {
            this.searchAction = str;
        } else {
            this.searchAction = '';
        }
    } else if (str === 'Adventure') {
        if (event.target.checked) {
            this.searchAdventure = str;
        } else {
            this.searchAdventure = '';
        }
    } else if (str === 'Survival') {
        if (event.target.checked) {
            this.searchSurvival = str;
        } else {
            this.searchSurvival = '';
        }
    } else if (str === 'Horror') {
      if (event.target.checked) {
          this.searchHorror = str;
      } else {
          this.searchHorror = '';
      }
    } else if (str === 'Simulation') {
      if (event.target.checked) {
          this.searchSimulation = str;
      } else {
          this.searchSimulation = '';
      }
    }

    // this.addToLibrary(id: string){
    //   this.pSub = this.gamesService.getById(id).subscribe((game: Game) => {
    //     this.gamesService.update({
    //       ...game,
    //       bougth: true
    //     }).subscribe(() => {
    //       this.ngOnInit();
    //       alert('The Game has been added to the library');
    //     });
    //   });
    // }
  }
}
 

