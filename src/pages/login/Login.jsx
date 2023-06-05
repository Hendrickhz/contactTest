import React, { useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router";
import { Alert, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/feature/authSlice";
import { useForm } from "@mantine/form";
import { BiKey } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
	const [failed, setFailed] = useState(false);
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			
			password: (value) =>
				value.length < 8 ? "Password must be 8 characters" : null,
		},
	});

	const [login, { isLoading }] = useLoginMutation();
	const nav = useNavigate();

	const dispatch = useDispatch();

	return (
		<section className=" bg-gray-50 min-h-screen flex items-center justify-center">
			<div className=" flex rounded-xl shadow-md max-w-full items-center p-5 justify-center">
				<div className=" md:w-1/2 px-8 md:px-16">
					<h2 className=" font-bold text-2xl text-color text-center mb-4">Login</h2>
					<p className=" text-sm font-light text-color mb-3 text-center">Welcome, if you already a member, log in here</p>
					<form
						onSubmit={form.onSubmit(async (values) => {
							const { data, error } = await login(values);
							if (data?.success) {
								dispatch(addUser({ user: data?.user, token: data?.token }));
								nav("/");
							} else  {
								setFailed(true);
								form.reset();
							}
						})}
						className=" flex flex-col gap-4 w-full p-7 shadow "
					>
						 {failed && (
							<Alert title="Login Failed!" color="red" >
							  Please make sure your email and password are correct and try
							  again.
							</Alert>
						  )}
						<div className=" flex gap-3 items-center">
							<GoMail className=" text-xl mr-3" />

							<TextInput				
								className=" w-full"
								withAsterisk
								{...form.getInputProps("email")}
								placeholder="Enter your email..."
							/>
						</div>					
						<div className=" flex gap-3 items-center">
							<BiKey className=" text-xl mr-3" />
							<PasswordInput	
								className=" w-full"
								withAsterisk
								{...form.getInputProps("password")}
								placeholder="Enter your password ..."
							/>
						</div>
						<button
							disabled={isLoading && true}
							type="submit"
							className=" btn-color text-white  font-semibold  px-4 py-2 rounded tracking-wider shadow-sm hover:bg-orange-700 duration-300"
						>
							{isLoading ? <Loader className="block mx-auto py-1" color="#fff" variant="dots" size={"md"} /> : "Login"}
						</button>
					</form>
					<div className=" my-3 grid grid-cols-3 items-center text-gray-400">
						<hr className="border-gray-400" />
						<p className="text-center text-sm">OR</p>
						<hr className="border-gray-400" />
					</div>
					<button className=" border rounded py-2 w-full flex justify-center items-center text-sm hover:bg-gray-300 duration-300">
						<FcGoogle className=" text-2xl mr-3" />
						Login with Google
					</button>
					<div className="my-3">
						<Link>
							<p className="text-xs text-color font-extralight hover:text-gray-600 duration-300">
								
								Forget your password?
							</p>
						</Link>
					</div>
					<div className="flex justify-between items-center ">
						<p className=" text-xs text-color font-extralight">
							Don't have account?
						</p>
						<Link to={'/register'}>
						
						<button className="  outline outline-offset-0  outline-gray-100 px-4 text-sm py-2 flex items-center gap-2 rounded-md tracking-wider shadow-sm hover:bg-orange-500 hover:text-white duration-300">
							Register
						</button>
						</Link>
					</div>
				</div>
				<div className=" md:block w-1/2 hidden">
					<img
						src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?size=626&ext=jpg"
						className="rounded"
						alt=""
					/>
				</div>
			</div>
		</section>
	);
};

export default Login;
