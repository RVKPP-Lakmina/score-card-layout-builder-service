import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = Reflector.createDecorator<boolean>();
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Decorator = (...args: string[]) => SetMetadata('decorator', args);
