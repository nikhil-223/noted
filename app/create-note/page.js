"use client";

import Form from "@/components/Form";
import { useSession,signIn } from "next-auth/react";
import Link from "next/link";

const CreateNote = () => {
	const { data: session } = useSession();
	return (
		<section className="flex sm:flex-col lg:flex-row md:flex-row md:items-start justify-around items-center p-5">
			{session?.user ? (
				<Form />
			) : (
				<>
					<div className="font-bold font-poppins mb-5 ">This app is free to use so please login first </div>
				</>
			)}
		</section>
	);
};

export default CreateNote;
