export interface ITimeTable {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
  delayed: boolean;
  error?: IError;
}

export interface IError {
  name: string;
  message: string;
}
