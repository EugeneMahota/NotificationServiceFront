import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AddressService} from '../../../services/address.service';
import {Address} from '../../../models/address';

declare const ymaps: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterViewInit {

  public map: any;

  listAddress: Address[];

  constructor(private addressService: AddressService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadMaps();
    }, 200);

    this.getListAddress();
  }

  getListAddress() {
    this.addressService.getAll().subscribe(res => {
      this.listAddress = res;
    });
  }

  ngAfterViewInit() {
  }

  loadMaps() {
    this.map = new ymaps.Map('map', {
      center: [45.06741707457532, 39.037081],
      zoom: 15
    });

    setTimeout(() => {
      this.addObject();
    }, 300);
  }

  addObject() {
    this.map.geoObjects.add(
      new ymaps.Placemark([45.06741707457532, 39.037081],
        {
          iconCaption: 'РЕМТЕХСЕРВИС',
          draggable: true
        },
        {
          preset: 'islands#blueCircusIcon',
          iconColor: '#4CAF50'
        }
      ));
  }

}
