export class Left<L> {
	readonly value: L;

	constructor(value: L) {
		this.value = value;
	}

	isLeft(): this is Left<L> {
		return true;
	}

	isRight<T>(): this is Right<T> {
		return false;
	}
}

export class Right<R> {
	readonly value: R;

	constructor(value: R) {
		this.value = value;
	}

	isLeft<T>(): this is Left<T> {
		return false;
	}

	isRight(): this is Right<R> {
		return true;
	}
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R = never>(l: L): Either<L, R> => new Left(l);
export const right = <R, L = never>(r: R): Either<L, R> => new Right(r);
