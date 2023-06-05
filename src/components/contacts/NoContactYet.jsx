import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NoContactYet = ({ mainText, btnText, navLink }) => {
  const nav = useNavigate();
  return (
    <div className=" w-full min-h-[80vh] flex justify-center items-center">
      <div className="">
        <img
          className="w-[150px] mx-auto"
          src="public\empty-box.png"
          alt="empty-contact=img"
        />
        <div className=" mt-5 flex items-center flex-col gap-3">
          <p className=" text-color">
            {/* Looks like you haven't added any contacts yet. */}
            {mainText}
          </p>
          {btnText && (
            <button
              onClick={() => nav(`/${navLink}`)}
              className="  btn-color px-4 py-2 flex items-center gap-2 rounded tracking-wider shadow-sm hover:bg-orange-700 duration-300"
            >
              {" "}
              <BsFillPersonPlusFill />
              {/* Add Contact */}
              {btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoContactYet;
