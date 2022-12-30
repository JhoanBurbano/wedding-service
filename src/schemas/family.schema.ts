import { HydratedDocument, Schema as _Schema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Invite } from './';

export type FamilyDocument = HydratedDocument<Family>;

@Schema()
export class Family {
  @Prop({ unique: true, required: true })
  family: string;

  @Prop({ default: 0 })
  total: number;

  @Prop({ default: false })
  confirm: boolean;

  @Prop({ required: true })
  qrcode: string;

  @Prop({
    type: [{ type: _Schema.Types.ObjectId, ref: 'Invite' }],
    default: [],
  })
  integrants: Invite[];
}

export const FamilySchema = SchemaFactory.createForClass(Family);
