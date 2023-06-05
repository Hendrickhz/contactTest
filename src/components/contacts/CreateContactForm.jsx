import { TextInput } from "@mantine/core";
import {  useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../../redux/api/contactApi";
import { BsFillPersonFill, BsTelephoneFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { notifications } from "@mantine/notifications";
const CreateContactForm = () => {
  const token = Cookies.get('token');

  const [createContact] = useCreateContactMutation();
  const nav = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      address: (value) => (value.length < 1 ? "Address cannot be empty" : null),
      phone: (value) => (value.length < 1 ? "Phone cannot be empty" : null),
    },
  });

  return (
    <div className=" max-w-[500px]">
      <form
        onSubmit={form.onSubmit(async (values) => {
          console.log(values);
          const data = await createContact({ data: values, token });
          console.log(data);
          form.reset();
          nav("/dashboard");
          notifications.show({
            title: "Contact Notification",
            message: `${values?.name} is successfully added into the Contact List !`,
          });
        })}
        className=" flex-col flex gap-8"
      >
        <div className="flex gap-3 items-center">
          <BsFillPersonFill className="text-xl mr-3" />
          <TextInput
            className=" w-full"
            placeholder="Name"
            withAsterisk
            {...form.getInputProps("name")}
          />
        </div>
        <div className="flex gap-3 items-center">
          <MdEmail className="text-xl mr-3" />
          <TextInput
            className=" w-full"
            placeholder="Email"
            withAsterisk
            {...form.getInputProps("email")}
          />
        </div>
        <div className="flex gap-3 items-center">
          <BsTelephoneFill className="text-xl mr-3" />
          <TextInput
            className=" w-full"
            placeholder="Phone"
            withAsterisk
            {...form.getInputProps("phone")}
          />
        </div>

        <div className="flex gap-3 items-center">
          <FaHome className="text-xl mr-3" />
          <TextInput
            className=" w-full"
            placeholder="Address"
            withAsterisk
            {...form.getInputProps("address")}
          />
        </div>

        <div className="">
          <button className="  btn-color px-4 text-sm py-2 flex items-center gap-2 rounded tracking-wider shadow-sm hover:bg-orange-700 duration-300">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContactForm;
