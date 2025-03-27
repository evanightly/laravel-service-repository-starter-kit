import { AxiosInstance } from 'axios';
import type { route as routeFn } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        // Pusher: typeof Pusher;
        // Echo: Echo;
    }
    const route: typeof routeFn;
}
