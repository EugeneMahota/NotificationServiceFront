import {AfterViewInit, Component, OnInit} from '@angular/core';

declare const ymaps: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterViewInit {

  public map: any;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadMaps();
    }, 200);
  }

  ngAfterViewInit() {
  }

  loadMaps() {
    this.map = new ymaps.Map('map', {
      center: [45.034948074594105, 38.97850199999997],
      zoom: 15
    });

    setTimeout(() => {
      this.addObject();
    }, 300);
  }

  addObject() {
    this.map.geoObjects.add(
      new ymaps.Placemark([45.034948074594105, 38.97850199999997],
        {
          iconCaption: 'ULTRA SERVICE',
          draggable: true
        },
        {
          preset: 'islands#blueCircusIcon',
          iconColor: '#1565C0'
        }
      ));
  }

}
