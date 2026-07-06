import { useEffect } from "react";

export default function useNotifications(
  onMessage: (data: any) => void
) {
  useEffect(() => {
    const userId =
      localStorage.getItem("user_id");

    if (!userId) return;

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/${userId}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(
        event.data
      );

      onMessage(data);
    };

    return () => ws.close();
  }, []);
}