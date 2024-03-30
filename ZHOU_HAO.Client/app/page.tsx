"use client";

import HFullCard from "@/components/hFullCard";
import { Button, Flex, Space } from "antd";
import dayjs from "dayjs";
import { StatusProvider } from "../ts/context/context";
import { DataType } from "@/ts/dataType";
import StatusModule from "@/components/statusModule";
import LogModule from "@/components/logModule";
import { useImmer } from "use-immer";

export default function App() {
	const [food, setFood] = useImmer<DataType.FoodStatus>({
		foodOpen: false,
		waterOpen: false,
	});
	const [server, setServer] = useImmer<DataType.ServerConnectStatus>({
		connected: false,
		log: [{ msg: "尝试链接服务器", time: dayjs() }],
	});

	return (
		<StatusProvider
			foodStatus={food}
			serverStatus={server}>
			<HFullCard
				className="bg-sky-200 bg-opacity-10 rounded-none h-full pb-[90px]"
				title={
					<div className="text-center text-balance text-2xl bg-clip-text text-transparent bg-[linear-gradient(135deg,#5b247a,#1bcedf)]">
						<div className="mb-2">ZHOU_HAO&apos;S PET FEEDING SYSTEM</div>
						<div>周浩的宠物喂食系统</div>
					</div>
				}>
				<Space
					className="w-full"
					direction="vertical">
					<StatusModule />
					<LogModule />

					<HFullCard className="rounded-none fixed bottom-0 left-0 right-0 bg-white bg-opacity-50">
						<Flex justify="space-between">
							<Button
								ghost
								disabled={food.foodOpen}
								type="primary"
								onClick={() => {
									setFood((data) => {
										data.foodOpen = true;
									});
									setServer((data) => {
										data.log.push({ msg: "开始发放", time: dayjs() });
									});
								}}>
								开启食物
							</Button>
							<Button
								danger
								ghost
								disabled={!food.foodOpen}
								type="primary"
								onClick={() => {
									setFood((data) => {
										data.foodOpen = false;
									});

									setServer((v) => {
										v.log.push({ msg: "结束发放", time: dayjs() });
									});
								}}>
								关闭食物
							</Button>
						</Flex>
					</HFullCard>
				</Space>
			</HFullCard>
		</StatusProvider>
	);
}
