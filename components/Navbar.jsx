"use client";

import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const { data: session } = useSession();
	const pathname = usePathname()

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);

	return (
		<>
			<nav className="lg:flex sm:hidden md:flex items-center justify-between px-5 py-5 font-poppins font-bold">
				<Link
					href="/"
					className="logo text-4xl font-lilita  flex w-32 items-center justify-center blue_gradient">
					NOTED
				</Link>
				<ul className="flex gap-5 items-center text-cyan-600">
					{pathname !== '/create-note' && <li className=" text-xl font-bold">
						<Link href="/create-note">Create note</Link>
					</li>}
					{session?.user ? (
						<Link
							href="/profile"
							className="relative pr-2 w-10 h-10 rounded-full overflow-hidden bg-slate-600">
							<Image src={session?.user.image} alt="profile" fill />
						</Link>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="login_btn"
										type="button">
										Log in
									</button>
								))}
						</>
					)}
				</ul>
			</nav>

			{/* mobile navigation */}
			<nav className=" sm:flex relative lg:hidden md:hidden items-center justify-between py-5 px-3 font-poppins font-bold">
				<Link
					href="/"
					className="logo text-4xl font-lilita  flex w-32 items-center justify-center blue_gradient">
					NOTED
				</Link>

				{session?.user ? (
					<div
						className="relative pr-2 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-2xl"
						onClick={() => {
							setToggleDropdown((prev) => !prev);
						}}>
						<Image src={session?.user.image} alt="profile" fill />
					</div>
				) : (
					<div
						className="relative pr-2 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-2xl"
						onClick={() => {
							setToggleDropdown((prev) => !prev);
						}}>
						{/* <Image src="/images/dummy.jpg" alt="profile" fill /> */}
						<TiThMenu />
					</div>
				)}

				{toggleDropdown && (
					<div className=" absolute flex top-full right-2 flex-col gap-3 justify-center items-center bg-slate-100 p-3 rounded-lg text-cyan-600">
						<div
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}>
							<Link href="/create-note" className=" text-xl font-bold">
								Create note
							</Link>
						</div>
						{session?.user ? (
							<>
								<div
									onClick={() => {
										setToggleDropdown((prev) => !prev);
									}}>
									<Link href="/profile" className=" text-xl font-bold">
										Profile
									</Link>
								</div>

								<button
									className="login_btn"
									onClick={() => {
										signOut();
										setToggleDropdown((prev) => !prev);
									}}
									type="button">
									Sign Out
								</button>
							</>
						) : (
							<>
								{providers &&
									Object.values(providers).map((provider) => (
										<button
											key={provider.name}
											onClick={() => {
												signIn(provider.id);
												setToggleDropdown((prev) => !prev);
											}}
											className="login_btn"
											type="button">
											Log in
										</button>
									))}
							</>
						)}
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
