class ExtendableError extends Error {
  public errors: any;
  public status: string;
  public isPublic: boolean;
  public isOperational: boolean;

  constructor({
    message, errors, status, isPublic, stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    this.stack = stack;
  }
}

export default ExtendableError;
