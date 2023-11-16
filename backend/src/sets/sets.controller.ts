import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  // UseInterceptors,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { GetSetsFilterDto } from './dto/get-sets-filter.dto';
import { Set } from './set.entity';

@Controller('sets')
export class SetsController {
  constructor(private setsService: SetsService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllSets(@Query() filterDto: GetSetsFilterDto): Promise<Set[]> {
    return this.setsService.getSets(filterDto);
  }

  @Get('/:id')
  getSetById(@Param('id') id: string): Promise<Set> {
    return this.setsService.getSetById(id);
  }

  @Post()
  createSet(@Body() createSetDto: CreateSetDto): Promise<Set> {
    return this.setsService.createSet(createSetDto);
  }

  @Delete(':id')
  deleteSet(@Param('id') id: string): Promise<void> {
    return this.setsService.deleteSet(id);
  }

  // todo: add update endpoint
}
