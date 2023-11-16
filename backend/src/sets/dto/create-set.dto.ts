import { IsNotEmpty, IsOptional } from 'class-validator';
import { SetType } from '../set-type.model';

export class CreateSetDto {
  @IsNotEmpty()
  set_type: SetType;
  @IsNotEmpty()
  reps: number;
  @IsNotEmpty()
  weight: number;
  @IsOptional()
  failure_at: number;
  // todo: allow user to choose the date of the set
}
