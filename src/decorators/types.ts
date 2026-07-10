/**
 * decorator.types.ts
 * Tipado de decoradores TC39 Stage 3 (estándar nativo, no experimentalDecorators).
 * Referencia: https://github.com/tc39/proposal-decorators
 */

/* ============================================================
 * 1. CLASS DECORATOR
 * Firma: (target: Class, context: ClassDecoratorContext) => Class | void
 * ============================================================ */

export type ClassDecoratorFn<This = unknown, Args extends unknown[] = unknown[]> = (
    target: new (...args: Args) => This,
    context: ClassDecoratorContext<new (...args: Args) => This>
) => (new (...args: Args) => This) | void;

/* ============================================================
 * 2. METHOD DECORATOR
 * Firma: (target: Function, context: ClassMethodDecoratorContext) => Function | void
 * ============================================================ */

export type MethodDecoratorFn<
    This = unknown,
    Args extends unknown[] = unknown[],
    Return = unknown
> = (
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) => ((this: This, ...args: Args) => Return) | void;

/* ============================================================
 * 3. PROPERTY / FIELD DECORATOR
 * Firma: (target: undefined, context: ClassFieldDecoratorContext) => (initialValue) => value | void
 * Los field decorators reciben el valor inicial y pueden transformarlo.
 * ============================================================ */

export type FieldDecoratorFn<This = unknown, Value = unknown> = (
    target: undefined,
    context: ClassFieldDecoratorContext<This, Value>
) => ((initialValue: Value) => Value) | void;

/* ============================================================
 * 4. GETTER / SETTER DECORATOR
 * ============================================================ */

export type GetterDecoratorFn<This = unknown, Return = unknown> = (
    target: (this: This) => Return,
    context: ClassGetterDecoratorContext<This, Return>
) => ((this: This) => Return) | void;

export type SetterDecoratorFn<This = unknown, Value = unknown> = (
    target: (this: This, value: Value) => void,
    context: ClassSetterDecoratorContext<This, Value>
) => ((this: This, value: Value) => void) | void;

/* ============================================================
 * 5. ACCESSOR DECORATOR (propiedades declaradas con `accessor`)
 * Firma: (target: ClassAccessorDecoratorTarget, context) => ClassAccessorDecoratorResult | void
 * ============================================================ */

export type AccessorDecoratorFn<This = unknown, Value = unknown> = (
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
) => ClassAccessorDecoratorResult<This, Value> | void;

/* ============================================================
 * 6. DECORATOR FACTORY genérico
 * Para decoradores que reciben argumentos: @Roles('admin', 'editor')
 * ============================================================ */

export type DecoratorFactory<
    DecoratorArgs extends unknown[],
    Decorator extends (...args: any[]) => any
> = (...args: DecoratorArgs) => Decorator;

// Ejemplo de uso concreto para tu caso RBAC/PBAC:
export type RolesDecoratorFactory = DecoratorFactory<
    [...roles: string[]],
    MethodDecoratorFn
>;

/* ============================================================
 * 7. METADATA HELPER (para usar junto a context.metadata)
 * En TC39 decorators, el objeto metadata se comparte entre
 * todos los decoradores de una misma clase vía Symbol.metadata.
 * ============================================================ */

export type DecoratorMetadata = Record<PropertyKey, unknown>;

declare global {
    interface SymbolConstructor {
        readonly metadata: unique symbol;
    }
}

/* ============================================================
 * 8. Tipos de contexto reexportados por conveniencia
 * (ya vienen en lib.decorators.d.ts, pero se agrupan aquí
 * para no andar importando de todos lados)
 * ============================================================ */

export type AnyDecoratorContext =
    | ClassDecoratorContext
    | ClassMethodDecoratorContext
    | ClassFieldDecoratorContext
    | ClassGetterDecoratorContext
    | ClassSetterDecoratorContext
    | ClassAccessorDecoratorContext;