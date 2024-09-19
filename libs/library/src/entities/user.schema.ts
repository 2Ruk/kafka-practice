import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'user' })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;
}
