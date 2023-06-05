
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { setSearchTerm } from "../../redux/feature/contactSlice";
import { useDispatch } from "react-redux";
import { Table } from "@mantine/core";
import "./contactTable.css";
import { Input } from "@material-tailwind/react";


const ShowTable = ({ rows }) => {
  const dispatch = useDispatch();
  return (
    <div className="md:w-[80%] w-[90%] mx-auto  lg:m-0">
      <div className="my-2">
        <div className="relative flex w-full gap-2 md:w-max ">
          <Input
            type="search"
            label="Search here..."
            className="pr-20"
            icon={<BiSearchAlt />}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
        </div>
      </div>
      <Table highlightOnHover className="select-none">
        <colgroup>
          <col style={{ width: "30%" }} /> {/* Always show the name column */}
          <col style={{ width: "30%" }} className="hide-on-mobile" />{" "}
          {/* Hide on mobile */}
          <col style={{ width: "30%" }} className="hide-on-mobile" />{" "}
          {/* Hide on mobile */}
          <col style={{ width: "10%" }} /> {/* Hide on mobile */}
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-on-mobile">Phone Number</th>{" "}
            {/* Hide on mobile */}
            <th className="hide-on-mobile">Address</th> {/* Hide on mobile */}
            <th className=""></th> {/* Hide on mobile */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default ShowTable;
