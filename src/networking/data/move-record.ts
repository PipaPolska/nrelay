import { Packet } from './../packet';

export class MoveRecord {

    time: number;
    x: number;
    y: number;

    public read(packet: Packet): void {
        this.time = packet.readInt32();
        this.x = packet.readFloat();
        this.y = packet.readFloat();
    }

    public write(packet: Packet): void {
        packet.writeInt32(this.time);
        packet.writeFloat(this.x);
        packet.writeFloat(this.y);
    }
}
