import { typeToFlattenedError } from "zod";

export type FieldErrorType = {
  [key: string]: string;
};

export class FormError extends Error {
  public flattenedError: typeToFlattenedError<FieldErrorType, string>;

  constructor(flattenedError: typeToFlattenedError<FieldErrorType, string>) {
    super(JSON.stringify(flattenedError));
    this.flattenedError = flattenedError;
  }
}
