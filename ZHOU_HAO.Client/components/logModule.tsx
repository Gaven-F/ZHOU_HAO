import HFullCard from "./hFullCard";
import { useContext, useEffect, useRef } from "react";
import { ServerContext } from "@/ts/context/context";
import { DataType } from "@/ts/dataType";

export default function LogModule() {
	const data = useContext(ServerContext);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = divRef.current;
		if (!div) return;
		div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
	});
	return (
		<HFullCard
			className="h-auto"
			styles={{ body: { padding: 0 } }}
			title={<span> 日志记录 </span>}>
			<div
				ref={divRef}
				className="rounded-md h-36 text-xs overflow-auto">
				{data.log.map((l, i) => (
					<LogLine key={i}>{l}</LogLine>
				))}
			</div>
		</HFullCard>
	);
}

const LogLine = ({
	children,
	textColor,
}: {
	children: DataType.Log;
	textColor?: "";
}) => {
	return (
		<div
			className={
				"border-b border-dashed border-stone-500 font-medium border-opacity-50 mb-1 px-2 " +
				`text-[${textColor}] flex flex-row justify-between`
			}>
			<div>{children.msg}</div>
			<div suppressHydrationWarning>{children.time.format("HH:mm:ss")}</div>
		</div>
	);
};
