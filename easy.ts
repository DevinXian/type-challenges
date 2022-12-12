// Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Readonly
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// TupleToObject - error
type TupleToObject_error<T extends any[]> = {
  [P in T[number]]: P;
};

// key point： T[number] returns tuple element type
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};
// const list = [1, 'b', 'c'] as const
// type B = TupleToObject<typeof list>

type FirstOfArray<T> = T extends [infer R, ...any[]] ? R : never;

// type tt = FirstOfArray<['b', 1, 'a']>;

type LengthOfTulple<T extends readonly any[]> = T['length'];

// type MyExcludeError<T, U> = {
//   [P in keyof T]:  P in U ? never: T[P]
// }
type MyExclude<T, U> = T extends U ? never : T;

type MyAwaitedNotCompleted<T> = T extends Promise<infer R> ? R : never;

// recursively await
type MyAwaited<T> = T extends Promise<infer R>
  ? R extends Promise<any>
    ? MyAwaited<R>
    : R
  : never;

// If
type If<C extends boolean, T, F> = C extends true ? T : F;

// Concat
type Concat<T extends any[], K extends any[]> = [...T, ...K];

// Includes
type IncludesNotOK<T extends any[], K> = K extends T[number] ? true : false;

type is3 = Includes<[1, 2], 1 | 2>; // IncludesNotOK returns false, but true expected

// answser is taken from 'https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650'
type Equal<A, B> = (<T>() => T extends A ? 1 : 0) extends <T>() => T extends B
  ? 1
  : 0
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
