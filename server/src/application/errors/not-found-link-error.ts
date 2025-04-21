export class NotFoundLinkError extends Error {
	constructor() {
		super("Link not found");
		this.name = "NotFoundLinkError";
	}
}
