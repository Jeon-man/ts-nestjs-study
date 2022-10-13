import { ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer';
import { ValidatorOptions, validate, validateSync } from 'class-validator';

type ClassConstructor<T> = { new (...args: any[]): T };

export interface ValidateOptions {
  transformToInstanceOptions?: ClassTransformOptions;
  transformToPlainOptions?: ClassTransformOptions;
  validateOptions?: ValidatorOptions;
  /** @default false */
  sync?: boolean;
}

export interface SyncValidator<T extends object, V extends Record<string, unknown>> {
  (val: V, options?: ValidateOptions): T;
  (val: V[], options?: ValidateOptions): T[];
}
export interface AsyncValidator<T extends object, V extends Record<string, unknown>> {
  (val: V, options?: ValidateOptions): Promise<T>;
  (val: V[], options?: ValidateOptions): Promise<T[]>;
}

export type Validator<
  T extends object = any,
  V extends Record<string, unknown> = { [key in keyof T]: T[key] },
  Opt extends ValidateOptions = ValidateOptions,
> = Opt['sync'] extends true ? SyncValidator<T, V> : AsyncValidator<T, V>;

export function createValidator<
  T extends object,
  V extends Record<string, unknown> = { [key in keyof T]: T[key] },
  Opt extends ValidateOptions = ValidateOptions,
>(
  cls: ClassConstructor<T>,
  {
    transformToInstanceOptions: outerTransformToInstanceOptions,
    transformToPlainOptions: outerTransformToPlainOptions,
    validateOptions: outerValidateOptions,
    sync,
  }: Opt = {} as Opt,
): Validator<T, V, Opt> {
  return ((
    val: any,
    {
      transformToInstanceOptions: innerTransformToInstanceOptions,
      transformToPlainOptions: innerTransformToPlainOptions,
      validateOptions: innerValidateOptions,
    }: ValidateOptions = {},
  ) => {
    const instance = plainToInstance(cls, val, {
      enableImplicitConversion: true,
      ...outerTransformToInstanceOptions,
      ...innerTransformToInstanceOptions,
    });

    const plain = instanceToPlain(instance, {
      enableImplicitConversion: true,
      ...outerTransformToPlainOptions,
      ...innerTransformToPlainOptions,
    }) as V;

    if (!sync) {
      return new Promise<V>(async (resolve, reject) => {
        const errors = await validate(instance, {
          skipMissingProperties: false,
          ...outerValidateOptions,
          ...innerValidateOptions,
        });

        if (errors.length > 0) return reject(errors);

        return resolve(plain);
      });
    } else {
      const errors = validateSync(instance, {
        skipMissingProperties: false,
        ...outerValidateOptions,
        ...innerValidateOptions,
      });

      if (errors.length > 0) throw errors;

      return plain;
    }
  }) as Validator<T, V, Opt>;
}
