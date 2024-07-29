import { IAggs } from "@polygon.io/client-js";

export interface AggregatesResponse {
	error?: string | undefined;
	data: IAggs | null;
}
