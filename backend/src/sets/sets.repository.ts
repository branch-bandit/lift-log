import { EntityRepository, Repository } from 'typeorm';
import { Set } from './set.entity';
import { CreateSetDto } from './dto/create-set.dto';
import { GetSetsFilterDto } from './dto/get-sets-filter.dto';

@EntityRepository(Set)
export class SetsRepository extends Repository<Set> {
  async getSets(filterDto: GetSetsFilterDto): Promise<Set[]> {
    const query = this.createQueryBuilder('set');
    const { set_type, date } = filterDto;

    if (set_type) {
      query.andWhere('set.set_type = :set_type', { set_type });
    }

    if (date) {
      // sql partial match to search for year, month and day
      query.andWhere('set.date::text LIKE :date', {
        date: `${date}%`,
      });
    }

    const sets = await query.getMany();
    return sets;
  }

  async createSet(createSetDto: CreateSetDto): Promise<Set> {
    const todayDate = new Date();

    const newSet = {
      ...createSetDto,
      date: todayDate,
    };
    const set = this.create(newSet);

    await this.save(set);
    return set;
  }
}
