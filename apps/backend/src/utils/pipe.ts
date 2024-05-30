// pipe function taken from: https://dev.to/nexxeln/implementing-the-pipe-operator-in-typescript-30ip

export interface Pipe {
  <A>(value: A): A
  <A, B>(value: A, fn1: (input: A) => B): B
  <A, B, C>(value: A, fn1: (input: A) => B, fn2: (input: B) => C): C
  <A, B, C, D>(value: A, fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D): D
  <A, B, C, D, E>(value: A, fn1: (input: A) => B, fn2: (input: B) => C, fn3: (input: C) => D, fn4: (input: D) => E): E
  // ... and so on
}

export const pipe: Pipe = (value: any, ...fns: Function[]): unknown => {
  return fns.reduce((acc, fn) => fn(acc), value)
}
