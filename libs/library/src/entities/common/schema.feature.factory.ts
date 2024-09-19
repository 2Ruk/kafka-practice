import { SchemaFactory } from '@nestjs/mongoose';
import { ModelDefinition } from '@nestjs/mongoose/dist/interfaces';

/**
 * Class에 해당하는 Type
 */
type ClassType<T> = new (...args: any[]) => T;

/**
 * Mongoose Module에 Feature를 등록하기 위한 Factory
 */
export class SchemaFeatureFactory {
  static create<T>(target: ClassType<T>): ModelDefinition {
    const targetSchema = SchemaFactory.createForClass(target);

    return {
      schema: targetSchema,
      name: target.name,
    };
  }
}
