import { Component, OnInit, Input } from '@angular/core';
import * as interfaces from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-seasons-controller',
  templateUrl: './seasons-controller.component.html',
  styleUrls: ['./seasons-controller.component.css']
})
export class SeasonsControllerComponent implements OnInit {

  @Input() seasons: interfaces.Season[];

  constructor() { }

  ngOnInit(): void {
  }

}
