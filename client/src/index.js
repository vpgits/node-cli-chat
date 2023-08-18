const { io } = require("socket.io-client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = io("http://localhost:3000", {
  autoConnect: true,
});

function mode() {
  rl.question("(mode)[send(s)|receive(r)|quit(q)]:", (choice) => {
    switch (choice.toLowerCase()) {
      case "q":
        rl.close();
        socket.disconnect();
        break; // End the function without calling mode() again
      case "s":
        rl.question("Enter your message: ", (input) => {
          socket.emit("message", input);
          mode(); // Loop back to mode selection
        });
        break;
      case "r":
        console.log("Receiving mode activated. Awaiting messages...");
        mode(); // Loop back to mode selection
        break;
      default:
        mode(); // Loop back to mode selection
    }
  });
}

// Move the listener for the 'message' event outside the mode function to avoid setting up multiple listeners
socket.on("message", (data) => {
  rl.write("\n")
  console.log(data);
});

socket.on("connect", () => {
  console.log("Connected to the server:", socket.connected); // This should now always print true

  //welcome message

  setTimeout(() => mode(), 2000);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("reconnect_failed", () => {
  console.log("Reconnection failed indefinitely");
  socket.disconnect();
});
