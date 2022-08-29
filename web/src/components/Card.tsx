import { ITimeTable } from "../interfaces";

type Bus = {
  bus: ITimeTable;
}

const Card = ({ bus }: Bus) => {
  return (
    <div key={bus.id} className="Card Roll-up">
      <div className="Card__Header">
        <b>{bus.busId}</b>
      </div>
      <div className="Card__Details">
        <div>{bus.destination}</div>
        {bus.minutesUntilArrival <= 1 ? (
          <div className="Card__Alert">
            <span className="Due">Due</span>
            <span className="Blob"></span>
          </div>
        ) : (
          <div>{`${bus.minutesUntilArrival} mins `}{bus.delayed && `(exp. ${bus.minutesUntilArrival + 3} mins)`}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
