import { IError } from "../interfaces";

type Error = {
  error: IError;
};

const Error = ({ error }: Error) => {
  return (
    <div className="Error Roll-up">
      <div className="Card__Header">
        <b>{error.name}</b>
      </div>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
