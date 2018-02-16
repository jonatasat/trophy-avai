import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { PaginationService } from '../../pagination.service';
import { FirebaseApp } from 'angularfire2';


@Component({
  selector: 'app-edit-players-match',
  templateUrl: './edit-players-match.component.html',
  styleUrls: ['./edit-players-match.component.css']
})
export class EditPlayersMatchComponent implements OnInit {

  match: any;
  showPlayer: any = null;
  showReferee: any = null;
  showCoach: any = null;
  players: Observable<any[]>;
  coaches: Observable<any[]>;
  referees: Observable<any[]>;
  storageRef: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private router: Router, private paginationService: PaginationService, private firebase: FirebaseApp) { 
    console.log(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.match = this.db.object('matches/'+ this.route.snapshot.params['id']).valueChanges();
    
    this.storageRef = this.firebase.storage().ref();
    this.players = this.db.list('players').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.storageRef = this.firebase.storage().ref();
    this.coaches = this.db.list('coaches').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
    this.storageRef = this.firebase.storage().ref();
    this.referees = this.db.list('referees').snapshotChanges().map(actions =>{
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  onSubmit(form){
   console.log(form);
   if(this.showPlayer == true){
    this.storePlayer(form);
   }else if(this.showCoach == true){
    this.storeCoach(form);
   }else if(this.showReferee == true){
     this.storeReferee(form);
   }
   
   
  }

  storePlayer(form){
    let nome = form.value.player.name;
    let posicao = form.value.player.position;
    let nomeFile = form.value.player.fileName;
    let url = form.value.player.photo;
    let nota = form.value.grade;
    let key = form.value.player.key;

    this.db.database.ref('matches/'+ this.route.snapshot.params['id'] + '/players/'+ key).set({
      name: nome,
      position: posicao,
      photo: url,
      fileName: nomeFile,
      grade: nota
    });

  }

  storeCoach(form){
    let nome = form.value.coach.name;
    let nomeFile = form.value.coach.fileName;
    let url = form.value.coach.photo;
    let nota = form.value.grade;
    let key = form.value.coach.key;

    this.db.database.ref('matches/'+ this.route.snapshot.params['id'] + '/coaches/'+ key).set({
      name: nome,
      photo: url,
      fileName: nomeFile,
      grade: nota
    });
  }

  storeReferee(form){
    let nome = form.value.referee.name;
    let nomeFile = form.value.referee.fileName;
    let url = form.value.referee.photo;
    let nota = form.value.grade;
    let key = form.value.referee.key;

    this.db.database.ref('matches/'+ this.route.snapshot.params['id'] + '/referees/'+ key).set({
      name: nome,
      photo: url,
      fileName: nomeFile,
      grade: nota
    });
  }

  detectType(event){
    if(event.target.value == 'Jogador'){
      this.showPlayer = true;
      this.showCoach = false;
      this.showReferee = false;
    }else if(event.target.value == 'Tecnico'){
      this.showPlayer = false;
      this.showCoach = true;
      this.showReferee = false;
    }else if(event.target.value == 'Arbitro'){
      this.showPlayer = false;
      this.showCoach = false;
      this.showReferee = true;
    }else{
      this.showPlayer = false;
      this.showCoach = false;
      this.showReferee = false;
    }
   
    
  }

}
