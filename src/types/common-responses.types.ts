type Status = -1 | 0 | 1;

export type ReponseSingleData<T> = Promise<{
  data: T;
  status: Status;
  message: string;
}>;

export type ResponseManyData<T> = Promise<{
  data: { [key: string]: T };
  status: Status;
  message: string;
}>;
