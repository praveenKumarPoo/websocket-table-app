import request from 'utils/request';

export function table() {
  return request('/api/homeTable', { method: 'GET' });
}

export function initWebsocket() {
  return eventChannel(emitter => {
    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2")
    ws.onopen = () => {
      console.log('opening...')
      ws.send('hello server')
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
      if (msg) {
        const { payload: book } = msg
        const channel = msg.channel
        switch (channel) {
          case 'ADD_BOOK':
            return emitter({ type: ADD_BOOK, book })
          case 'REMOVE_BOOK':
            return emitter({ type: REMOVE_BOOK, book })
          default:
            // nothing to do
        }
      }
    }
    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}