import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-back-box',
  templateUrl: './back-box.component.html',
  styleUrls: ['./back-box.component.css']
})
export class BackBoxComponent implements OnInit {

  @Output() goBackEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    this.goBackEvent.emit(null);
  }

}
