import { HydratedDocument, Schema as _Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Family } from './family.schema';

export type InviteDocument = HydratedDocument<Invite>;

@Schema()
export class Invite {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop({ type: _Schema.Types.ObjectId, ref: 'Family' })
  family: Family;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
