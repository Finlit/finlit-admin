import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-sppinners',
  templateUrl: './sppinners.component.html',
  styleUrls: ['./sppinners.component.css']
})
export class SppinnersComponent implements OnInit {
  @Input() isLoading: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
