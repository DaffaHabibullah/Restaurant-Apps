const webSoketInit = {
    init(url) {
        const webSoket = new WebSocket(url);
        webSoket.onmessage = this._onMessageHandler;
    },

    _onMessageHandler(message) {
        console.log(message.data);
        console.log(JSON.parse(message.data));
    },
};


export default webSoketInit;
