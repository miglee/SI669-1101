import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


// ****
import {Entry} from '../../models/entry';
import {HomePage} from '../home/home';
// import { entries } from '../home/home';

import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';




/**
 * Generated class for the EntryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  // private entryTitle: string;
  // private entryText: string;
  private entry:Entry;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: EntryDataServiceProvider) {
  


    let entryID = this.navParams.get("entryID");
    console.log("preparing to load up entry with id ", entryID);
    let entry = this.dataService.getEntryByID(entryID);
    console.log("retrieved entry:", entry);
    
if (entryID === undefined) {
        this.entry = new Entry();
        this.entry.title = "";
        this.entry.text = "";
        this.entry.id = -1; // placeholder for 'temporary' entry
      } else {
        this.entry = this.dataService.getEntryByID(entryID);
      }
      console.log("entry is ", this.entry);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryDetailPage');
  }

  private saveEntry() {

    // 
    // let newEntry = new Entry();
    // newEntry.title = this.entryTitle;
    // newEntry.text = this.entryText;
// 



    // this won't work. you can't take variable straight from anotehr page.
    // HomePage.entries.push(newEntry);
    // sisn't work
    // entries.push(newEntry); 
    // console.log("Now I would save the entry: ", newEntry);
    // console.log(JSON.stringify(newEntry));

    this.dataService.addEntry(this.entry);
    this.navCtrl.pop();
  }

}
