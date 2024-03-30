"use client";
import { DataType } from "@/ts/dataType";
import { ReactNode, createContext } from "react";

export const FoodContext = createContext<DataType.FoodStatus>({
	foodOpen: false,
	waterOpen: false,
});

export const ServerContext = createContext<DataType.ServerConnectStatus>({
	connected: false,
	log: [],
});

export const StatusProvider = ({
	children,
	foodStatus,
	serverStatus,
}: {
	children: ReactNode;
	foodStatus: DataType.FoodStatus;
	serverStatus: DataType.ServerConnectStatus;
}) => {
	return (
		<FoodContext.Provider value={foodStatus}>
			<ServerContext.Provider value={serverStatus}>
				{children}
			</ServerContext.Provider>
		</FoodContext.Provider>
	);
};
