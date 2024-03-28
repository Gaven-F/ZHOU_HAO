"use client";

import HFullCard from "@/components/hFullCard";
import { Button, ConfigProvider, Descriptions, Flex, Space, Tag } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { concat, padStart } from "lodash";
import { Noto_Sans_SC } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const noto = Noto_Sans_SC({ subsets: ["latin"] });

export default function App() {
	const logDiv = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);
	const [log, setLog] = useState<{ msg: string; time: Dayjs }[]>([
		{ msg: "开始链接服务器", time: dayjs() },
	]);

	const scrollDown = () => {
		setTimeout(() => {
			logDiv.current?.scrollTo({
				behavior: "smooth",
				top: logDiv.current.scrollHeight,
			});
		}, 15);
	};

	useEffect(() => {}, []);

	return (
		<HFullCard
			className="bg-sky-200 bg-opacity-10 rounded-none"
			title={
				<div className="text-center text-balance text-2xl bg-clip-text text-transparent bg-[linear-gradient(135deg,#5b247a,#1bcedf)]">
					<div className="mb-2">ZHOU_HAO&apos;S PET FEEDING SYSTEM</div>
					<div>周浩的宠物喂食系统</div>
				</div>
			}>
			<Space
				className="w-full"
				direction="vertical">
					
				<HFullCard
					className="h-auto"
					title="状态显示">
					<ConfigProvider componentSize="small">
						<Descriptions
							className="[&_*]:!text-sm"
							column={3}
							colon={false}
							layout="vertical">
							<Descriptions.Item label="服务器链接">
								<Tag color="green-inverse">连接成功</Tag>
							</Descriptions.Item>
							<Descriptions.Item label="喂食状态">
								<Tag color={open ? "green-inverse" : "yellow-inverse"}>
									{open ? "发放中" : "未发放"}
								</Tag>
							</Descriptions.Item>
						</Descriptions>
					</ConfigProvider>
				</HFullCard>

				<HFullCard
					className="h-auto"
					styles={{ body: { padding: 0 } }}
					title={<span> 日志记录 </span>}>
					<div
						ref={logDiv}
						className="rounded-md h-36 text-xs overflow-auto">
						{log.map((l, i) => (
							<LogLine key={i}>{l}</LogLine>
						))}
					</div>
				</HFullCard>

				<Flex justify="space-between">
					<Button
						ghost
						disabled={open}
						type="primary"
						onClick={() => {
							setOpen(true);
							setLog((log) =>
								concat(log, { msg: "阀门打开，发放食物", time: dayjs() }),
							);
							scrollDown();
						}}>
						开启食物
					</Button>
					<Button
						danger
						ghost
						disabled={!open}
						type="primary"
						onClick={() => {
							setOpen(false);
							setLog((log) =>
								concat(log, { msg: "阀门关闭，停止发放食物", time: dayjs() }),
							);
							scrollDown();
						}}>
						关闭食物
					</Button>
				</Flex>
			</Space>
		</HFullCard>
	);
}

const LogLine = ({
	children,
	textColor,
}: {
	children: { msg: string; time: Dayjs };
	textColor?: "";
}) => {
	return (
		<div
			className={
				"border-b border-dashed border-stone-500 font-medium border-opacity-50 mb-1 px-2 " +
				`text-[${textColor}] flex flex-row justify-between`
			}>
			<div>{children.msg}</div>
			<div suppressHydrationWarning>{children.time.format("HH:mm:ss.SSS")}</div>
		</div>
	);
};
