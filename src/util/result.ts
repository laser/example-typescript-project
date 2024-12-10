export type Result<T, E> = { data: T; type: 'ok' } | { error: E; type: 'error' };

export function Ok<T>(data: T): Result<T, never> {
  return { data, type: 'ok' };
}

export function Err<E>(error: E): Result<never, E> {
  return { error, type: 'error' };
}

export async function unpack<T, E>(p: Promise<Result<T, E>>): Promise<[E, null] | [null, T]> {
  const v = await p;

  if (typeof v === 'undefined' || typeof v.type === 'undefined') {
    throw new Error('tried to use unpack on a promise that did not wrap a Result value');
  }

  if (isErr(v)) {
    return [unwrapErr(v), null];
  }

  return [null, unwrapOk(v)];
}

export async function unpack2<T, U, E>(p: Promise<Result<[T, U], E>>): Promise<[E, null, null] | [null, T, U]> {
  const v = await p;

  if (typeof v === 'undefined' || typeof v.type === 'undefined') {
    throw new Error('tried to use unpack on a promise that did not wrap a Result value');
  }

  if (isErr(v)) {
    return [unwrapErr(v), null, null];
  }

  return [null, ...unwrapOk(v)];
}

export async function xunpack<T, E>(p: Promise<Result<T, E>>): Promise<T> {
  const [err, val] = await unpack(p);
  if (err) {
    throw err;
  }

  return val as T;
}

function isErr<T, E>(result: Result<T, E>): result is { error: E; type: 'error' } {
  return result.type === 'error';
}

function unwrapErr<T, E>(result: Result<T, E>): E {
  if (result.type === 'ok') {
    throw new Error('unwrapErr called on Ok');
  }

  return result.error;
}

function unwrapOk<T, E>(result: Result<T, E>): T {
  if (result.type === 'error') {
    throw new Error('unwrapOk called on Err');
  }

  return result.data;
}
