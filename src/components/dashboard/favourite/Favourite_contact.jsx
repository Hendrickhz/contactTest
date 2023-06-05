import React from "react";
import { useDeleteContactMutation } from "../../../redux/api/contactApi";
import {  BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { Menu } from "@mantine/core";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdModeEditOutline, MdOutlineFavorite } from "react-icons/md";
import "./Favourite_contact.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import "../../contacts/contactTable.css";
import {
  removeFavorite,
  setFavorite,
  setVisit,
} from "../../../redux/feature/contactSlice";
import Cookies from "js-cookie";
import ShowTable from "../../contacts/ShowTable";
import NoContactYet from "../../contacts/NoContactYet";

const Favourite_contact = () => {
  const token = Cookies.get("token");
  const [deleteContact] = useDeleteContactMutation();
  const nav = useNavigate();

  const deleteHandler = (contact, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteContact({ id, token });
        dispatch(removeFavorite(contact));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const contactsData = useSelector((state) => state.contactSlice.contacts);
  const favorite = useSelector((state) => state.contactSlice.favorite);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  console.log(favorite);
  console.log(contactsData);
  const dispatch = useDispatch();

  if (true) {
    if (favorite?.length > 0) {
      const displayContactsData =
        searchTerm.trim() === ""
          ? favorite
          : favorite.filter((contact) =>
              contact.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

      const rows =
        displayContactsData.length === 0 ? (
          <tr>
            <td className=" text-center" colSpan={4}>
              No contacts found{" "}
            </td>
          </tr>
        ) : (
          displayContactsData?.map((contact) => (
            <tr key={contact?.id} className=" parent">
              <td>
                <p>{contact?.name}</p>
                <span className=" text-gray-600">{contact?.email}</span>
              </td>

              <td className=" hide-on-mobile ">{contact?.phone}</td>
              <td className=" hide-on-mobile ">{contact?.address}</td>
              <td className="">
                <div className=" child flex items-center gap-3">
                  <MdOutlineFavorite
                    onClick={() => {
                      if (contact?.isFavourite) {
                        dispatch(removeFavorite(contact));
                      } else {
                        dispatch(setFavorite(contact));
                      }
                    }}
                    size={"1.5rem"}
                    className={`cursor-pointer ${
                      contact?.isFavourite ? "text-orange-500" : "text-gray-500"
                    }`}
                  />
                  <Menu width={200} shadow="md">
                    <Menu.Target>
                      <button className=" p-2 border bg-white shadow-sm">
                        <BsThreeDotsVertical />
                      </button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        icon={<FaEye />}
                        component="a"
                        onClick={() => {
                          dispatch(setVisit(contact));
                          nav(`/contacts/${contact.id}`);
                        }}
                      >
                        View
                      </Menu.Item>

                      <Menu.Item
                        icon={<MdModeEditOutline />}
                        component="a"
                        onClick={() => nav(`/contacts/edit/${contact.id}`)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        icon={<FaTrash />}
                        component="a"
                        onClick={() => deleteHandler(contact, contact.id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </td>
            </tr>
          ))
        );
      return <ShowTable rows={rows} />;
    } else if (favorite?.length == 0) {
      return (
     
        <NoContactYet
          mainText={"Looks like you haven't added any contacts yet."}
          btnText={"Add Favourite"}
          navLink={"dashboard"}
        />
      );
    }
  }
};

export default Favourite_contact;
