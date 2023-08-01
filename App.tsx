import Route from "./routing/Route";
// install complementary packages to use this package
import { Provider } from "react-redux";
import { store } from "./store/store";
// import { STRIPE_API_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { LogBox, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  class Event {
    type: any;
    payload: any;
    // Each Event needs a Type
    // The payload is not required
    constructor(type: any, payload: any) {
      this.type = type;
      this.payload = payload;
    }
  }

  /**
   * SendMessageEvent is used to send messages to other clients
   * */
  class SendMessageEvent {
    message: any;
    from: any;
    constructor(message: any, from: any) {
      this.message = message;
      this.from = from;
    }
  }
  /**
   * NewMessageEvent is messages comming from clients
   * */
  class NewMessageEvent {
    message: any;
    from: any;
    sent: any;
    constructor(message: any, from: any, sent: any) {
      this.message = message;
      this.from = from;
      this.sent = sent;
    }
  }
  const payload = {
    type: "sent_order",
    payload: {
      message: "Greetings from frontend!",
      from: "your_username", // Replace "your_username" with the actual username of the sender
      
    },
  };
  const ws = new WebSocket("ws://192.168.1.19:4002/ws");

  React.useEffect(() => {
    console.log("ws: ", ws);
    // Send the event to the WebSocket connection

    ws.onopen = (event) => {
      console.log("WebSocket connected:", event);
    };

    // Messages that were received from the WebSocket server
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      routeEvent(event);
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    return () => {
      ws.close();
    };
  }, []);

  function routeEvent(event: MessageEvent<any>) {
    console.log("Event type", event.type);
    const parseEvent = JSON.parse(event.data)
    if (parseEvent.type === undefined) {
      alert("no 'type' field in parseEvent");
    }
    switch (parseEvent.type) {
      case "new_order":
        // Format payload
        console.log('received message from web socket: ', parseEvent)


        if(parseEvent.payload.julian_boolean){
          alert("Julian Boolean")
        }
        // const messageEvent = Object.assign(NewMessageEvent, event);
        // //appendChatMessage(messageEvent);
        // console.log("new message created: ", new messageEvent());
        break;
      default:
        alert("unsupported message type");
        break;
    }
  }
  function sendEvent(eventName: string, payload: any) {
    // Create a event Object with a event named send_message
    const event = new Event(eventName, payload);
    // Format as JSON and send
    console.log('event created: ',  payload)
    ws.send(JSON.stringify( payload));
  }

  const sendFakeMessage = () => {
    const newmessage = "Greetings from Frontend";
    if (newmessage != null) {
      let outgoingEvent = new SendMessageEvent(newmessage, "percy");
      sendEvent("sent_order", payload);
    }
  };

  return (
    // <View>
    //   <TouchableOpacity
    //     onPress={sendFakeMessage}
    //     style={{ backgroundColor: "coral", padding: "10%" }}
    //   >
    //     <Text>Send order</Text>
    //   </TouchableOpacity>
    // </View>
    <Provider store={store}>
      <StripeProvider
        publishableKey={
          process.env.STRIPE_API_KEY ? process.env.STRIPE_API_KEY : ""
        }
      >
        <Route />
      </StripeProvider>
    </Provider>
  );
}
