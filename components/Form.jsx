'use client'

import React from 'react'
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Form = () => {

	const {data:session} = useSession()
	const router = useRouter()

    const [note, setNote] = useState({
			title: "",
			note: "",
			tag: [],
		});

        const [submitting, setSubmitting] = useState(false)

    const createNotes = async (e) => {
			e.preventDefault();
			setSubmitting(true);
			try {
				const response = await fetch("/api/notes/new", {
					method: "POST",
					body: JSON.stringify({
						title: note.title,
						note:note.note,
						tag: note.tag,
						userId: session?.user.id,
					}),
				});

				const data= await response.json()
				console.log(data);
				if (response.ok) {
					router.push(`/notes/${data._id}`);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setSubmitting(false);
			}
		};
  return (
		<form
			id="addNotes"
			onSubmit={createNotes}
			className="sm:w-full md:w-2/3 flex flex-col gap-3 shadow-md rounded bg-blue-100 p-3">
			<div className="flex flex-col gap-1">
				<label className=" font-poppins font-bold" htmlFor="title">
					Title
				</label>
				<input
					value={note.title}
					onChange={(e) => {
						setNote({ ...note, title: e.target.value });
					}}
					placeholder="Enter the Title"
					className="text_input rounded-md"
					type="text"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<label className=" font-poppins font-bold" htmlFor="note">
					Note
				</label>
				<textarea
					value={note.note}
					onChange={(e) => {
						setNote({ ...note, note: e.target.value });
					}}
					placeholder="Write the Note"
					className="text_input rounded-md h-72"
					type="text"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<label className=" font-poppins font-bold" htmlFor="tag">
					Tag
				</label>
				<input
					value={note.tag === [] ? [] : note.tag.join(" ")}
					onChange={(e) => {
						setNote({ ...note, tag: e.target.value.split(" ") });
					}}
					placeholder="Enter the Tag separated with spaces"
					className="text_input rounded-md"
					type="text"
				/>
			</div>
			<div className="mt-3 flex justify-between items-center gap-2">
				<div >
					<Link
						href='/notes'
						className="an-btn p-2">
						All notes
					</Link>
				</div>
				<div className='flex gap-2'>
					<button
						className="btn-normal"
						type="button"
						onClick={() => {
							setNote({ title: "", note: "", tag: [] });
						}}>
						Clear
					</button>
					<button className="btn" type="submit">
						Create note
					</button>
				</div>
			</div>
		</form>
	);
}

export default Form