import { Room, Client } from "colyseus";
import { State } from "./schema/State";

export class World extends Room {

  maxClients = 4;

  onCreate (options: any) {
      console.log("StateHandlerRoom created!", options);

      this.setState(new State());

      this.onMessage("move", (client, data) => {
          console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
          this.state.movePlayer(client.sessionId, data);
      });
  }

  onAuth(client: any, options: any, req: any) {
      return true;
  }

  onJoin (client: Client) {
      client.send("hello", "world");
      this.state.createPlayer(client.sessionId);
  }

  onLeave (client: any) {
      this.state.removePlayer(client.sessionId);
  }

  onDispose () {
      console.log("Dispose StateHandlerRoom");
  }

}
