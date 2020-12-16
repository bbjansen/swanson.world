import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("number")
  x = 0;

  @type("number")
  z = 0;
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

      } else if (movement.z) {
          this.players.get(sessionId).z += movement.z;
      }
  }
}
