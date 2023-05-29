import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Noted",
	description: " created using next.js framework and next-auth",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<Navbar />
					{children}
				</Provider>
			</body>
		</html>
	);
}
