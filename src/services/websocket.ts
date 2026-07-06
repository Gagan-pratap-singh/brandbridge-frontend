const WS_URL = "ws://127.0.0.1:8000";

class ChatWebSocket {
  private socket: WebSocket | null = null;

  connect(
    userId: number,
    onMessage: (data: any) => void
  ) {
    this.socket = new WebSocket(
      `${WS_URL}/ws/chat/${userId}`
    );

    this.socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.socket.onclose = () => {
      console.log("❌ WebSocket disconnected");

      // Auto reconnect after 3 seconds
      setTimeout(() => {
        this.connect(userId, onMessage);
      }, 3000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  }

  send(data: any) {
    if (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      this.socket.send(JSON.stringify(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const websocket = new ChatWebSocket();

export default websocket;