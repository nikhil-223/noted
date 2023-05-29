import Note from "@/models/note";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
	const { title, note, tag ,userId} = await request.json();

	try {
		await connectToDB();
		const newNote = new Note({ creator: userId,title,note, tag});

		await newNote.save();
		return new Response(JSON.stringify(newNote), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};
