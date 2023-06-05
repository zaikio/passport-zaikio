export class UserinfoError extends Error {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "UserinfoError";
    this.code = code;
    this.message = message;

    Object.setPrototypeOf(this, UserinfoError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.message;
  }
}
