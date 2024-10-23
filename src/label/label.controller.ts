import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';
import { QueryLabelDto } from './dto/query-label';


@UseGuards(AuthGuard)
@Controller('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Get('/all')
  findAll() {
    return this.labelService.findAll();
  }

  @Get()
  findOneByQuery(@Body() query: QueryLabelDto) {
    return this.labelService.findOneByQuery(query);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelService.remove(id);
  }
}
