import { IsString, Length } from 'class-validator';

export class InviteDTO {
  @IsString()
  @Length(3, 15)
  name: string;

  @IsString()
  @Length(3, 15)
  lastname: string;

  @IsString()
  family: string;
}
