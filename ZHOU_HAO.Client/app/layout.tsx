import type { Metadata } from "next";
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const noto = Noto_Serif_SC({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
	title: "Demo",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={noto.className}>
				<ConfigProvider
					theme={{ token: { fontFamily: "inherit", fontSize: 20 } }}
					componentSize="large">
					{children}
				</ConfigProvider>
			</body>
		</html>
	);
}
