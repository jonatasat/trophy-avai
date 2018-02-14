import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../pagination.service'
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import 'firebase/storage';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {

  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[];
  coaches: Observable<any[]>;
  storageRef: any;

  constructor(private paginationService: PaginationService, private db: AngularFireDatabase, private firebase: FirebaseApp) { }

  ngOnInit() {
    this.storageRef = this.firebase.storage().ref();
    this.coaches = this.db.list('coaches').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.allItems.push(this.coaches);
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  deleteItem(item){
    const itemsRef = this.db.list('coaches');
    itemsRef.remove(item.key);
    let deleteRef = this.storageRef.child(item.fileName);
    deleteRef.delete().then(function() {
      console.log('arquivo deletado');
    }).catch(function(error) {
      console.log('erro ao deletar arquivo');
    });
    
  }

}
