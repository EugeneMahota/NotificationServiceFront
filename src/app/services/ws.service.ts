import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WsContract} from '../models/wsContract';
import {environment} from '../../environments/environment';

const ws = new WebSocket(environment.apiUrl.replace('http', 'ws'));

@Injectable({
  providedIn: 'root'
})
export class WsService {

  wsContract: WsContract = new WsContract();

  constructor() {
  }

  getMessage(): Observable<any> {
    return new Observable(observer => {
      ws.onmessage = event => observer.next(event);
      ws.onerror = event => observer.error(event);
      ws.close = event => observer.complete();
    }).pipe(map(res => {
      return this.wsContract = JSON.parse(res['data']);
    }));
  }

  sendMessage(event: string, data: Object) {
    ws.send(JSON.stringify({event: event, data: data}));
  }
}
