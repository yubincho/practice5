import {CommonEntity} from "./common.entity";
import {Column, Entity} from "typeorm";

@Entity()
export class Product extends CommonEntity {

    @Column()
    public title: string;

    @Column()
    public dsc: string;

    @Column()
    public price: number;

}
