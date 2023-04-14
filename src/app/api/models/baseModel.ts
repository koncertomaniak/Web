export interface BaseModel<T> {
  data: T;
  errorMessage: string | null;
  statusCode: number;
}
