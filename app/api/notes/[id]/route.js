import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
	try {
		await connectToDB();
		const note = await Note.find({ _id: params.id });

		if(!note) return new Response('note not found',{ status: 404});

		return new Response(JSON.stringify(note), { status: 200 });
	} catch (error) {
		return new Response("failed to fetch note ", { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
	const { title, toUpdateNote, tag } = await request.json();
	try {
		await connectToDB();
		const note = await Note.findById( params.id);

		if(!note) return new Response('note not found',{ status: 404});

		note.title = title;
		note.note = toUpdateNote;
		note.tag= tag;

		await note.save();

		return new Response(JSON.stringify(note), { status: 200 });
	} catch (error) {
		return new Response("failed to fetch note ", { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();
		const note = await Note.findByIdAndRemove( params.id);

		if(!note) return new Response('note not found',{ status: 404});

		return new Response(JSON.stringify(note), { status: 200 });
	} catch (error) {
		return new Response("failed to fetch note ", { status: 500 });
	}
};
