import { Component, OnInit, Input } from '@angular/core';
import chroma from 'node_modules/chroma-js';
@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() name:string;
  @Input() visiblePercentage:number;
  @Input() truePercentage:number;
  constructor() { }

  ngOnInit() {
  }
  
  color() {
    var scale = chroma.scale(['red', 'yellow', 'green']);
		return scale(this.truePercentage).css();
	}
}
