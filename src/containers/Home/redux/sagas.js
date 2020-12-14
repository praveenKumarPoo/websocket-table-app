import {eventChannel} from 'redux-saga';
import { call,take, cancel, fork, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { TABLE } from './constants';


 function initWebsocket() {
   let  ws;
  return eventChannel(emitter => {
    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
   
    ws.onopen = () => {
      console.log('opening...');
      const data = {
        "event": "subscribe",
        "channel": "book",
        "symbol": "BTCUSD",
      }
      ws.send(JSON.stringify(data))
    }
    ws.onerror = (error) => {
      console.log('WebSocket error ' + error)
      console.dir(error)
    }
    ws.onmessage = (e) => {
      let msg = null
      try {
        msg = JSON.parse(e.data)
      } catch(e) {
        console.error(`Error parsing : ${e.data}`)
      }
      if (msg[1] && msg[1].length) {
        const payload = msg[1];
        const table={"price": payload[0], "amount": payload[2], "total": payload[1] };
        return emitter({ table });
      }
    }
    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}

function *init() {
  const channel = yield call(initWebsocket)
  while (true) {
      const { table } = yield take(channel)
      yield put({ type: TABLE, payload: table })
    }
}

function *sagas() {
  const task = yield fork(init);
  // exit current task when route change.
  yield take(LOCATION_CHANGE);
  yield cancel(task);
}

export default [sagas];

