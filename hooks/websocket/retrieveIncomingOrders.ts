const retrieveIncomingOrders = () => {
  const routeEvent = (event: MessageEvent<any>) => {
    console.log("Event type", event.type);
    const parseEvent = JSON.parse(event.data);
    if (parseEvent.type === undefined) {
      alert("no 'type' field in parseEvent");
    }
    switch (parseEvent.type) {
      case "new_order":
        // Format payload
        console.log("received message from web socket: ", parseEvent);

        if (parseEvent.payload.julian_boolean) {
          alert("Julian Boolean");
        }
        // const messageEvent = Object.assign(NewMessageEvent, event);
        // //appendChatMessage(messageEvent);
        // console.log("new message created: ", new messageEvent());
        break;
      default:
        alert("unsupported message type");
        break;
    }
  };
  return {
    routeEvent,
  };
};

export default retrieveIncomingOrders;
