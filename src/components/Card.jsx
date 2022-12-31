import React from "react";

function Card({ user }) {
  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content my-2">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user?.userName}</h2>
          <p>Secotors: {user?.sectors}</p>
          <p>Terms and Condition : {user.terms ? "Accept" : "Not accept"} </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-ghost">Deny</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
