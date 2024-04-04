"use client";

import HFullCard from "@/components/hFullCard";
import LogModule from "@/components/logModule";
import StatusModule from "@/components/statusModule";
import { DataType } from "@/ts/dataType";
import {
	ACTION_TYPE,
	DataReducer,
	DataReducerInitData,
} from "@/ts/reducer/dataReducer";
import { Button, Flex, Space } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { StatusProvider } from "../ts/context/context";

let cnt = 0;
export default function App() {
	const [food, setFood] = useImmer<DataType.FoodStatus>({
		foodOpen: false,
		waterOpen: false,
	});
	const [server, setServer] = useImmer<DataType.ServerConnectStatus>({
		connected: false,
		log: [{ msg: "尝试链接服务器", time: dayjs() }],
	});

	const [data, dispash] = useImmerReducer(DataReducer, DataReducerInitData);

	const openFoodBtnDisable = data.foodOpen && !data.connected;
	const closeFoodBtnDisable = !data.foodOpen || !data.connected;

	const addLog = useCallback(
		(msg: string) => {
			dispash({ type: ACTION_TYPE.ADD_LOG, payload: [{ msg, time: dayjs() }] });
		},
		[dispash],
	);

	// strictMode下，useEffect会执行两次
	// 在页面加载时，添加尝试连接服务器
	useEffect(() => {
		addLog("尝试连接服务器");
	}, [addLog]);

	return (
		<StatusProvider foodStatus={data} serverStatus={data}>
			<HFullCard
				className="bg-sky-200 bg-opacity-10 rounded-none h-full pb-[90px]"
				title={
					<div className="text-center text-balance text-2xl bg-clip-text text-transparent bg-[linear-gradient(135deg,#5b247a,#1bcedf)]">
						<div className="mb-2">ZHOU_HAO&apos;S PET FEEDING SYSTEM</div>
						<div>周浩的宠物喂食系统</div>
					</div>
				}
			>
				<Space className="w-full" direction="vertical">
					<StatusModule />
					<LogModule />

					<HFullCard className="rounded-none fixed bottom-0 left-0 right-0 bg-white bg-opacity-50">
						<Flex justify="space-between">
							<Button
								ghost
								disabled={openFoodBtnDisable}
								type="primary"
								onClick={() => {
									setFood((data) => {
										data.foodOpen = true;
									});
									setServer((data) => {
										data.log.push({ msg: "开始发放", time: dayjs() });
									});
									addLog("开始发放");
								}}
							>
								开启食物
							</Button>
							<Button
								danger
								ghost
								disabled={closeFoodBtnDisable}
								type="primary"
								onClick={() => {
									setFood((data) => {
										data.foodOpen = false;
									});
									setServer((data) => {
										data.log.push({ msg: "结束发放", time: dayjs() });
									});
									addLog("结束发放");
								}}
							>
								关闭食物
							</Button>
						</Flex>
					</HFullCard>
				</Space>
			</HFullCard>
		</StatusProvider>
	);
}
