import { Request } from 'express';
import {Member} from "../../member/entities/member.entity";

export interface RequestWithUserInterface extends Request {
    user: Member;
}