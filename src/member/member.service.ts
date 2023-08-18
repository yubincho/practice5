import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Member} from "./entities/member.entity";
import {Repository} from "typeorm";

@Injectable()
export class MemberService {

    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>
    ) {}


    async registerMember(createMemberDto: CreateMemberDto): Promise<Member> {
        const newUser = await this.memberRepository.create(createMemberDto)
        await this.memberRepository.save(newUser)
        newUser.password = undefined
        return newUser
    }

    async getAllMembers() {
        const members = await this.memberRepository.find()
        return members
    }

    async getUserById(id: string) {
        const user = await this.memberRepository.findOneBy({ id })
        if (user) return user
        throw new HttpException('No User', HttpStatus.NOT_FOUND)
    }


    async getUserByEmail(email: string) {
        const user = await this.memberRepository.findOneBy({ email })
        if (user) return user
        throw new HttpException('No user', HttpStatus.NOT_FOUND)
    }

}
