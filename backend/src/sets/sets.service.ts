import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { GetSetsFilterDto } from './dto/get-sets-filter.dto';
import { SetsRepository } from './sets.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Set } from './set.entity';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(SetsRepository)
    private setsRepository: SetsRepository,
  ) {}

  getSets(filterDto: GetSetsFilterDto): Promise<Set[]> {
    return this.setsRepository.getSets(filterDto);
  }

  async getSetById(id: string): Promise<Set> {
    const found = await this.setsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Set with ID "${id}" not found`);
    }
    return found;
  }

  getSet(createSetDto: CreateSetDto): Promise<Set> {
    return this.setsRepository.createSet(createSetDto);
  }

  createSet(createSetDto: CreateSetDto): Promise<Set> {
    return this.setsRepository.createSet(createSetDto);
  }

  async deleteSet(id: string): Promise<void> {
    const result = await this.setsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Set with ID "${id}" not found`);
    }
  }
}
