import { Room, Client } from "colyseus";
import { State } from "./schema/State";
import sanitizeHtml from 'sanitize-html';

export class World extends Room {

  maxClients = 100;

  onCreate (options: any) {
      console.log("World created!", options);

      // Player State
      this.setState(new State());

      this.onMessage("move", (client, data) => {
          console.log("[move]", client.sessionId, ":", data);
          this.state.movePlayer(client.sessionId, data);
      });

      // Player Message
      this.onMessage("message", (client, message) => {
        console.log("[message]", client.sessionId, ":", message);
        this.broadcast("messages", `<b>${client.sessionId}:</b> ${sanitizeHtml(message)}`);
    });
  }

  onAuth(client: any, options: any, req: any) {
      return true;
  }

  onJoin (client: Client) {
      //client.send("world");
      this.state.createPlayer(client.sessionId);
      this.broadcast("messages", `<i><b>${ client.sessionId }</b> joined swanson.world. say hello!</i>`);
  }

  onLeave (client: any) {
      this.state.removePlayer(client.sessionId);
      this.broadcast("messages", `${ client.sessionId } left.`);
  }

  onDispose () {
      console.log("Dispose World");
  }

}
