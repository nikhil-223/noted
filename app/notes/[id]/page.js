"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
	const { data: session } = useSession();
	const params = useParams();

	const [note, setNote] = useState({});
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false)

	useEffect(() => {

		const fetchNote = async () => {
			const response = await fetch(`/api/notes/${params.id}`);
			const data = await response.json();
			if(data) setNote(data[0]);
		};

		if (session?.user.id) {
			fetchNote();
		}
	}, [session]);

	const handleEdit = async () => {
		setSaving(true);
		setSaved(false);
		try {
			const response = await fetch(`/api/notes/${params.id}`, {
				method: "PATCH",
				body: JSON.stringify({
					title: note.title,
					toUpdateNote: note.note,
					tag: note.tag,
				}),
			});

			if (response.ok) {
				hideEditbtn();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSaving(false);
			setSaved(true)
		}
	};

	useEffect(() => {
	  
		if(saved) {
			setTimeout(() => {
				setSaved(false);
			}, 2100);
		}
		
	}, [saved])
	

	const showEditbtn = () => {
		document.getElementById("edit").style.visibility = "visible";
	};
	const hideEditbtn = () => {
		document.getElementById("edit").style.visibility = "hidden";
	};
	const handleChangeInput = (e) => {
		e.preventDefault();
		showEditbtn();
		setNote({ ...note, title: e.target.value });
	};
	const handleTextareaChange = (e) => {
		e.preventDefault();
		showEditbtn();
		setNote({ ...note, note: e.target.value });
	};
	return (
		<section className="md:px-24 sm:p-5 flex flex-col gap-4">
			<div className="flex justify-start gap-2">
				<span className="login_btn">
					<Link href="/create-note">Add new note</Link>
				</span>
				<span className="login_btn">
					<Link href="/notes">All notes</Link>
				</span>
			</div>
			<div className="w-full h-full rounded-lg p-3 shadow hover:shadow-md transition-all bg-slate-50">
				<div className="p-2 flex justify-between font-extrabold items-center">
					<input
						className="outline-none bg-transparent p-2"
						type="text"
						value={note.title}
						onChange={handleChangeInput}
					/>
					<div
						className="flex items-center gap-2 cursor-pointer"
						onClick={handleEdit}>
						{saved &&
							<span className="savedGif relative">
								<Image
									src={`https://i.gifer.com/XwI0.gif`}
									unoptimized={true}
									fill></Image>
							</span>
						}
						{!saved && <span
							id="edit"
							style={{ visibility: "hidden" }}
							className="py-1 px-2 bg-cyan-200 rounded-lg cursor-pointer">
							{saving === true ? "Saving" : "Save"}
						</span>}
					</div>
				</div>
				<div className="p-2 bg-white font-bold overflow-hidden">
					<textarea
						id="textarea-editable"
						type="text"
						className="w-full "
						value={note.note}
						onChange={handleTextareaChange}
					/>
				</div>
			</div>
		</section>
	);
};

export default page;
