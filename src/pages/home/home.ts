import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// ****import entry page
import {EntryDetailPage} from '../entry-detail/entry-detail';
import {Entry} from '../../models/entry';

// export let entries: Entry[] = []; //this will work but it's bad. Don't do it this way.
import { EntryDataServiceProvider } from '../../providers/entry-data-service/entry-data-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public entries: Entry[];
  constructor(public navCtrl: NavController, public dataService: EntryDataServiceProvider) {
    // let fakeEntries: Entry[] = [
    //   {
    //     title: "Latest Entry",
    //     text: "Today I went to my favorite class, SI 669. It was super great."
    //   },
    //   {
    //     title: "Earlier Entry",
    //     text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
    //   },
    //   {
    //     title: "First Entry",
    //     text: "OMG Project 1 was the absolute suck!"
    //   }
    // ];
    // this.entries = entries;


this.dataService.getObservable().subscribe(update => {
      this.entries = dataService.getEntries();
      console.log(this.entries);
    });

    this.entries = dataService.getEntries();
  }

  public addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }


  public editEntry(entryID: number) {
    debugger;
    console.log("editing entry ", entryID);
    this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
  }
}

