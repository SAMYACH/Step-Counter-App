/* eslint-disable prettier/prettier */
export interface ErrnoException extends Error {
  /**Provide number string to the error message */
  errno?: number;
  /**Provided string to the error message */
  code?: string;
  /**Provided string to the path message */
  path?: string;
  /**Provided string to the syscall message */
  syscall?: string;
  /**Provided stack string message */
  stack?: string;
}
