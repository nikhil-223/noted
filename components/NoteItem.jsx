import Link from "next/link";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";

const NoteItem = ({ id, title, note }) => {
	const handleDelete = async () => {
		let confirmed = confirm("Are you sure you want to delete this note");
		if (confirmed) {
			const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
		}
	};
	return (
		<div className="note_item">
			<div className="p-2 flex justify-between font-extrabold items-center">
				<Link href={`/notes/${id}`}>
					<span>{title}</span>
				</Link>
				<div
					id="delete-update"
					className="flex items-center gap-2 text-xl cursor-pointer">
					<span className="hover:text-emerald-700" onClick={handleDelete}>
						<MdDelete />
					</span>
				</div>
			</div>
			<Link href={`/notes/${id}`}>
				<div className="p-2 h-4/5 bg-white font-bold overflow-hidden">
					<span>
						{note.split(" ").slice(0, 50).join(" ")}
						{note.split(" ").length > 50 && " ..."}
					</span>
				</div>
			</Link>
		</div>
	);
};

export default NoteItem;
