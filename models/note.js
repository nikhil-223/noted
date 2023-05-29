import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({

	creator: {
		type: Schema.Types.ObjectId,
        ref:'User'
	},
	title: {
		type: String,
		required: [true, "Title is required!"],
	},
	note: {
		type: String,
		required: [true, "Note is required!"],
	},
	tag: {
		type: Array,
	},
});

const Note = models.Note || model("Note", noteSchema);

export default Note;
