import { ConfigProvider, Descriptions, Tag } from "antd";
import HFullCard from "./hFullCard";
import { useContext } from "react";
import { FoodContext } from "@/ts/context/context";

export default function StatusModule() {
	const data = useContext(FoodContext);

	return (
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
						<Tag color={data.foodOpen ? "green-inverse" : "yellow-inverse"}>
							{data.foodOpen ? "发放中" : "未发放"}
						</Tag>
					</Descriptions.Item>
				</Descriptions>
			</ConfigProvider>
		</HFullCard>
	);
}
