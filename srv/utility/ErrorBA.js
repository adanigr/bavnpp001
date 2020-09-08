module.exports = class ErrorBA extends Error {
	constructor(message) {
		super(message);
		this.name = 'BAVNPP001';
		Error.captureStackTrace(this, ErrorBA);
	}
}