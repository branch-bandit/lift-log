import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { SetType } from '../set-type.model';

export class GetSetsFilterDto {
  @IsOptional()
  @IsEnum(SetType)
  set_type?: SetType;
  @IsOptional()
  date?: string;
}
