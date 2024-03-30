import { Dayjs } from "dayjs";

export declare namespace DataType {
	/**
	 * 喂食的一些相关数据
	 */
	type FoodStatus = {
		/**
		 * 是否开放喂食
		 */
		foodOpen: boolean;
		/**
		 * 喂食标准重量
		 */
		foodWeight?: number | null;
		/**
		 * 当前食物重量
		 */
		currentFoodWeight?: number | null;
		/**
		 * 固定放食时间
		 */
		foodOpenTime?: Dayjs[];
		/**
		 * 是否放水
		 */
		waterOpen: boolean;
		/**
		 * 水位高度
		 */
		waterHeight?: number;
		/**
		 * 当前水位高度
		 */
		currentWaterHeight?: number | null;
		/**
		 * 固定放水时间
		 */
		waterOpenTime?: Dayjs[];
	};

	type ServerConnectStatus = {
		connected: boolean;
		msg?: string;
		log: Log[];
	};

	type Log = { msg: string; time: Dayjs };
}
