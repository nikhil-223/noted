"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = () => {
	const { data: session } = useSession();

	return (
		<section className="w-full gap-2 p-4 flex flex-col sm:items-between  font-bold">
			<div
				id="user-details"
				className="flex justify-between items-center md:w-2/5 bg-blue-100 p-2 font-bold rounded-lg">
				<span>{session?.user.name}</span>
				<div className=" w-10 h-10 relative rounded-full overflow-hidden">
					<Image src={session?.user.image} alt="profile image" fill></Image>
				</div>
			</div>
			<div className="flex flex-col p-2 gap-1 rounded-lg md:w-1/5 bg-blue-50 font-bold">
				<div className="hover:bg-blue-200 p-1 rounded-lg transition-all">
					<Link href="/notes">My Notes</Link>
				</div>
				<div className="hover:bg-blue-200 p-1 rounded-lg transition-all">
					<Link href="/create-note">Create Notes</Link>
				</div>
				<button
					className="login_btn"
					onClick={() => {
						signOut();
					}}
					type="button">
					Sign Out
				</button>
			</div>
		</section>
	);
};

export default Profile;
