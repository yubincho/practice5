import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {MemberService} from './member.service';
import {CreateMemberDto} from './dto/create-member.dto';
import {RoleGuard} from "../auth/guards/role.guard";
import {RoleEnum} from "./entities/role.enum";

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}


  @Post('register')
  async registerMember(@Body() createMemberDto: CreateMemberDto) {
    const newMember = await this.memberService.registerMember(createMemberDto)
    return newMember
  }


  @Get('all')
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  async memberGetAll() {
    const members = await this.memberService.getAllMembers()
    return { count: members.length, members }
  }

}
