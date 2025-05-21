import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
// import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Controller('user-groups')
export class UserGroupController {
    constructor(private readonly userGroupService: UserGroupService) { }

    @Post()
    create(@Body() dto: CreateUserGroupDto) {
        return this.userGroupService.create(dto);
    }

    @Get()
    findAll() {
        return this.userGroupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userGroupService.findOne(id);
    }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() dto: UpdateUserGroupDto) {
    //     return this.userGroupService.update(id, dto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userGroupService.remove(id);
    }
}