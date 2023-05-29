import About from "@/components/About";
import Form from "@/components/Form";
import Notes from "@/components/Notes";

export default function Home() {
	return (
		<main className="flex sm:flex-col lg:flex-row md:flex-row md:items-start justify-around items-center p-5">
			<About/>
		</main>
	);
}
