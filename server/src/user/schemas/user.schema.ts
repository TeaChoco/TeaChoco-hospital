//-Path: "TeaChoco-Hospital/server/src/user/schemas/user.schema.ts"
import { Document } from 'mongoose';
import { Allow } from '../dto/user.dto';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    googleId: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    firstName?: string;

    @Prop()
    lastName?: string;

    @Prop()
    picture?: string;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ createdAt: 1 });
