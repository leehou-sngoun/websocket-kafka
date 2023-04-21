import logo from "./logo.svg";
import "./App.css";
import SockJS from "sockjs-client";
import { over } from "stompjs";

function App() {

  var stompClient =null;

  const connect =()=>{
    let sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(sock);
    stompClient.connect({},onConnected, onError);
}

const onConnected = () => {
    stompClient.subscribe('/notify/123', onMessageReceived)
    console.log("Subscribed");
}

const onMessageReceived = (payload)=>{
  // var payloadData = JSON.parse(payload.body);
  console.log(payload);
  new Notification("New Notification", {
    body: "This is Socket notification",
  });
}
const onError = (err) => {
  console.log(err);
}


  const handleClick = () => {
      Notification.requestPermission().then(per => {
        if (per === "granted")
          new Notification("New Notification", {
            body: "This is local notification",
          });
      });
      connect()
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
