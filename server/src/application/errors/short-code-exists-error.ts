export class ShortCodeExistsError extends Error {
	constructor() {
		super("Short code already exists");
		this.name = "ShortCodeExistsError";
	}
}
