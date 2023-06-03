"use client";

import React, { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Notes = () => {
	const pathname = usePathname();
	const { data: session } = useSession();

	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNotes = async () => {
			const response = await fetch(`/api/user/${session?.user.id}/notes`);
			const data = await response.json();
      
			if (data) {
        data.reverse();
				setNotes(data);
			}
		};

		if (session?.user.id) {
			fetchNotes();
		}
	},[session?.user.id]);

	return (<section
			id="notes"
			className={`sm:w-full flex sm:justify-center md:justify-start flex-wrap px-2 sm:py-5 md:pt-0 gap-2 ${
				pathname === "/notes" && "mt-8"
			}`}>
			{notes.length===0? <div className="w-full text-2xl font-bold flex justify-center">You don't have any notes</div>:notes.map((note) => (
				<NoteItem
					key={note._id}
					id={note._id}
					title={note.title}
					note={note.note}
				/>
			))}
		</section>)
};

export default Notes;
