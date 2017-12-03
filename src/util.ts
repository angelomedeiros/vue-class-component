import Vue, { ComponentOptions } from 'vue'
import { DecoratedClass } from './declarations'

export const noop = () => {}

export const hasProto = { __proto__: [] } instanceof Array

export interface VueDecorator {
  // Class decorator
  (Ctor: typeof Vue): void

  // Property decorator
  (target: Vue, key: string): void

  // Parameter decorator
  (target: Vue, key: string, index: number): void
}

export function createDecorator (factory: (options: ComponentOptions<Vue>, key: string, index: number) => void): VueDecorator {
  return (target: Vue | typeof Vue, key?: any, index?: any) => {
    const Ctor = typeof target === 'function'
      ? target as DecoratedClass
      : target.constructor as DecoratedClass
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }
    if (typeof index !== 'number') {
      index = undefined
    }
    Ctor.__decorators__.push(options => factory(options, key, index))
  }
}

export function isPrimitive (value: any): boolean {
  const type = typeof value
  return value == null || (type !== "object" && type !== "function")
}

export function warn (message: string): void {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message)
  }
}
