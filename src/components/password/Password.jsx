import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "@mantine/form";
import { PasswordInput,  Box } from "@mantine/core";
import { usePasswordChangingMutation } from "../../redux/api/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const token = Cookies.get("token");
  const [passwordChanging] = usePasswordChangingMutation();
  const nav = useNavigate();
  const form = useForm({
    initialValues: {
        current_password: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  return (
    <>
      <div className="flex flex-col items-center border lg:w-8/12 lg:p-5 rounded-lg m-3 p-5">
        <h1 className="text-3xl">Name</h1>
        <div className="flex items-center gap-2 text-xl">
          <FaUserCircle />
          <h4>Email</h4>
        </div>
        <Box mx="" className=" w-full">
          <form
            onSubmit={form.onSubmit(async (values) => {
              
              const { data, error } = await passwordChanging({ values, token });
              if (data?.success) {
                nav("/login");
            } else if (error) {
                setFailed(error?.data?.message);
            }
            })}
          >
            <h4 className=" md:text-2xl mb-3">Password</h4>
            <PasswordInput
              label="Current Password"
              placeholder="Current Password"
              {...form.getInputProps("current_password")}
            />

            <PasswordInput
              mt="sm"
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              mt="sm"
              label="Confirm password"
              placeholder="Confirm password"
              {...form.getInputProps("password_confirmation")}
            />
            <button className=" btn-color py-1 px-2 rounded mt-3" type="submit">
              Submit
            </button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Password;
