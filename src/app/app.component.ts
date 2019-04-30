import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hotelsSocket: Subject<Object>;

  // testHotelsData = [
  //   {
  //     name: 'Принц Парк Отель',
  //     img: 'http://stroy-consult.ru/sites/default/files/imagecache/200x200/IMG-20150915-WA0002.jpg',
  //     mark: 1,
  //     address: 'Юго-западный округ',
  //     paymentOld: 5469,
  //     payment: 3718,
  //     currency: 'RUB',
  //     stars: getStarsArrayFromMark,
  //     discount: generateDiscount
  //   },
  //   {
  //     name: 'Президент-Отель',
  //     img: 'http://stroy-consult.ru/sites/default/files/imagecache/200x200/IMG-20150915-WA0002.jpg',
  //     mark: 2,
  //     address: 'Юго-западный округ',
  //     payment: 6277,
  //     currency: 'RUB',
  //     stars: getStarsArrayFromMark,
  //     discount: generateDiscount
  //   }
  // ];

  hotels = [];

  constructor() {
    this.hotelsSocket = webSocket(environment.ws_url);

    this.hotelsSocket.subscribe(
      message => {
        this.fetchHotels(message)
      },
      error => console.log(error)
    );

    this.hotelsSocket.next(environment.authRequest);
  }

  ngOnInit() {
  }

  fetchHotels(message) {
    const hotelsData = message.data;

    if (!hotelsData) {
      this.search();
    } else {
      const imgServer = 'https://img1.night2stay.com';
      const noImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkyjuvPRgyPwMqFLHch-Mt11J-VP2i3RDnUzYC4bnl_NgURLkC7w';

      if (hotelsData.search) {
        let newHotels = hotelsData.search.map(hotel => {
          const hotelClear = {
            name: hotel.info.name,
            img: hotel.info.img ? imgServer+hotel.info.img : noImageUrl,
            mark: hotel.info.cat,
            address: hotel.info.addr,
            payment: hotel.items[0][0].commerce.payment,
            paymentNew: hotel.items[0][0].commerce.tpayment,
            currency: hotel.items[0][0].commerce.reservationfeecurrency,
            stars: getStarsArrayFromMark,
            discount: generateDiscount
          };

          return hotelClear;
        });

        // this.hotels = [...this.hotels, ...newHotels];
        this.hotels = newHotels;
      }

      this.search(hotelsData);
    }
  }

  search(hotelsData?) {
    if (!hotelsData) {
      this.hotelsSocket.next(environment.findHotelsRequest);
    } else if (!hotelsData.done) {
      this.hotelsSocket.next(environment.findHotelsRequest);
    } else {
      this.hotelsSocket.unsubscribe();
    }
  }
}

function generateDiscount() {
  if (!this.paymentOld) {
    return 0;
  }

  const delta = this.paymentOld - this.payment;
  const discount = delta/this.paymentOld * 100;
  const roundedDiscount = Math.ceil(discount);

  return roundedDiscount;
}

function getStarsArrayFromMark() {
  const stars = ['','',''];

  for (let i = 0; i < this.mark; i++) {
    stars.push('');
  }

  return stars;
}