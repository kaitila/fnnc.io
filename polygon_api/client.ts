import { restClient } from '@polygon.io/client-js';
export const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);