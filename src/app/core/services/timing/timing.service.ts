import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimingService {
  private startTime: any;
  private endTime: any;

  constructor() { }

  start() {
    this.startTime = new Date();
  };
  
  end() {
    this.endTime = new Date();
    let timeDiff = this.endTime - this.startTime; //in ms
    
    console.log(timeDiff + " milisegundos");
  }
}
