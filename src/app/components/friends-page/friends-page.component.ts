import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/interfaces';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit, OnDestroy {
  friends: Friend[] = [];
  friendsAll: Friend[] = [];
  pSub!: Subscription;
  pSubAll!: Subscription;
  searchStr = '';
  flag = true;

  constructor (private friendsService: FriendsService) { }

  ngOnInit() {
    this.pSub = this.friendsService.getAllFriends().subscribe(friends => {
      this.friends = friends.filter(elem => elem.added);
    });
    this.pSubAll = this.friendsService.getAllFriends().subscribe(friends => {
      this.friendsAll = friends.filter(elem => !elem.added);
    });
  }

  remove(id: string) {
    this.pSub = this.friendsService.getByIdFriend(id).subscribe((friend: Friend) => {
      this.friendsService.updateFriend({
        ...friend,
        added: false
      }).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  add(id: string) {
    this.pSub = this.friendsService.getByIdFriend(id).subscribe((friend: Friend) => {
      this.friendsService.updateFriend({
        ...friend,
        added: true
      }).subscribe(() => {
        this.ngOnInit();
      });
    });
  }
  cancel(id: string) {
    this.pSub = this.friendsService.getByIdFriend(id).subscribe((friend: Friend) => {
      this.friendsService.updateFriend({
        ...friend,
        added: false
      }).subscribe(() => {
        this.ngOnInit();
      });
    });
  }
  onChange(event:any) {
    if (!(!event.target.value)) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}