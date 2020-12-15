import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("number")
  x = 0;

  @type("number")
  y = 0;
}

export class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  something = "This attribute won't be sent to the client-side";

  createPlayer(sessionId: string) {
      this.players.set(sessionId, new Player());
  }

  removePlayer(sessionId: string) {
      this.players.delete(sessionId);
  }

  movePlayer (sessionId: string, movement: any) {
      if (movement.x) {
          this.players.get(sessionId).x += movement.x;

      } else if (movement.y) {
          this.players.get(sessionId).y += movement.y;
      }
  }
}
