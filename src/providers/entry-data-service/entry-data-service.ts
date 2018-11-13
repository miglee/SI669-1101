
import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
/*
  Generated class for the EntryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntryDataServiceProvider {

private entries:Entry[]=[];
private nextID: number = 0;

  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;

  constructor() {

    this.loadFakeEntries();
    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    
    this.storage.get("myDiaryEntries").then(data => {
      if (data != undefined && data != null) {
        this.entries = JSON.parse(data);
        this.notifySubscribers();
      }
    }, err => {
      console.log(err);
    });
    
   this.storage.get("nextID").then(data => {
      if (data != undefined && data != null) {
        this.nextID = data;
        console.log("got nextID: ", this.nextID);
      }
    }, err => {
      console.log(err);
    })
  }


  public getObservable(): Observable<Entry[]> {
    return this.clientObservable;
  }


  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

public getEntries(): Entry[] {
	let entriesClone = JSON.parse(JSON.stringify(this.entries));
    return entriesClone;
}



private loadFakeEntries() {
    this.entries = [
      {
        id: this.getUniqueID(),
        title: "Entry A",
        text: "Today I went to my favorite class, SI 669. It was super great."
      },
      {
        id: this.getUniqueID(),
        title: "Entry B",
        text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
      },
      {
        id: this.getUniqueID(),
        title: "Entry C",
        text: "OMG Project 1 was the absolute suck!"
      }
    ];
  }


  public addEntry(entry:Entry) {
    entry.id = this.getUniqueID();
    this.entries.push(entry);
    this.notifySubscribers();
    this.saveData();
    console.log("Added an entry, the list is now: ", this.entries);
  }


  private getUniqueID(): number {
 
    let uniqueID = this.nextID++;
    this.storage.set("nextID", this.nextID);
    return uniqueID;
  }

  
  public getEntryByID(id: number): Entry {
    for (let e of this.entries) {
      if (e.id === id) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }



  public updateEntry(id: number, newEntry: Entry): void {
    let entryToUpdate: Entry = this.findEntryByID(id); 
    entryToUpdate.title = newEntry.title;
    entryToUpdate.text = newEntry.text;
    this.notifySubscribers();
    this.saveData();
  }
  
  private findEntryByID(id: number): Entry {
    for (let e of this.entries) {
      if (e.id === id) {
         return e;
      }
    }
    return undefined;
  }


  public removeEntry(id: number): void {
    for (let i = 0; i < this.entries.length; i++) {
      let iID = this.entries[i].id;
      if (iID === id) {
        this.entries.splice(i, 1);
        break;
      }
    }
    this.notifySubscribers();
    this.saveData();
  }


  private saveData(): void {
    let key = "myDiaryEntries";
    this.storage.set(key, JSON.stringify(this.entries));
  }

}
