import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'rooms'})
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bed: number;
    
    @Column()
    bath_room: number;

    @Column()
    room_type: number;
    
    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    status_id: number;

    @Column()
    floor_id: number;

    @Column()
    is_closed: boolean;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}
