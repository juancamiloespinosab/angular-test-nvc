import { Component, OnInit, Output, Input, EventEmitter, Renderer2, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as interfaces from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<interfaces.SearchData>();
  @ViewChild("input") input: ElementRef;

  searchData: interfaces.SearchData;
  searchForm: FormGroup;
  incorrectForm: boolean = false;

  inputOpen: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keywords: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]+')])
    });
  }

  search() {

    if (this.inputOpen) {

      if (this.searchForm.valid) {
        this.searchData = {
          keywords: this.searchForm.get('keywords').value,
          page: 1
        }
        this.searchEvent.emit(this.searchData);
      } else {
        this.incorrectForm = true;
      }

    } else {
      this.renderer.addClass(this.input.nativeElement, "search-box__text-box--open");
      this.inputOpen = true;
    }


  }

}
