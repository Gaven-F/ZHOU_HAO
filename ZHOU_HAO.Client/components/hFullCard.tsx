import { Card, CardProps } from "antd";

/**
 * 封装的Antd-Card，使其可以适应满高度的情况
 * @param 基本的Antd-Card的参数
 * @returns
 */
export default function HFullCard({ styles, className, ...prop }: CardProps) {
	return (
		<Card
			{...prop}
			className={className + ` h-full w-full flex flex-col`}
			styles={{
				...styles,
				body: { ...styles?.body, flex: "1 0 max-content" },
			}}>
			{prop.children}
		</Card>
	);
}
