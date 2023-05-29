
const About = () => {
  return (
		<section className="about flex sm:flex-col lg:flex-row md:flex-row md:items-start justify-around items-center p-5 font-bold">
			<div>
				<h1 className=" text-3xl font-lilita font-light">About Noted</h1>
				<p className=" mt-2 text-lg">
					The Note-Making App is an online platform that allows users to create,
					manage, and organize their notes effectively. It provides a
					user-friendly interface and powerful features to enhance productivity.
				</p>

				<h2 className=" text-2xl mt-4">Features</h2>
				<ul className="text-lg font-medium">
					<li className="mt-3 font-normal">
						<div className=" font-extrabold text-xl">Next.js 13 </div>: The app
						is developed using Next.js 13, a cutting-edge web development
						framework. It offers server-side rendering, static site generation,
						and other advanced features for fast and optimized performance.
					</li>
					<li className="mt-3 font-normal">
						<div className=" font-extrabold text-xl">NextAuth.js </div>: User
						authentication is implemented using NextAuth.js, a flexible
						authentication library for Next.js applications. It supports various
						authentication providers, and in this app, Google authentication is
						utilized to allow users to securely log in using their Google
						accounts.
					</li>
					<li className="mt-3 font-normal">
						<div className=" font-extrabold text-xl">
							Google Authentication{" "}
						</div>
						: The app integrates with Google authentication, allowing users to
						log in with their Google credentials. This ensures a seamless and
						personalized experience while maintaining the security of user
						accounts.
					</li>
					<li className="mt-3 font-normal">
						<div className=" font-extrabold text-xl">Responsive Design </div>:
						The app is designed to be responsive, adapting to different screen
						sizes and devices. Whether accessed from a desktop, tablet, or
						mobile phone, users can enjoy a consistent and optimized experience.
					</li>
					<li className="mt-3 font-normal">
						<div className=" font-extrabold text-xl">CRUD Operations </div>:
						Users can create, read, update, and delete notes. This allows for
						easy note creation and editing, providing users with full control
						over their content.
					</li>
				</ul>
			</div>
		</section>
	);
}

export default About