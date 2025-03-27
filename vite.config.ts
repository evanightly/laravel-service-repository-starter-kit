import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tanstackQueryKeysPlugin from './vite_plugins/tanstackQueryKeysPlugin';
import intentEnumPlugin from './vite_plugins/transformIntentEnumPlugin';
import permissionEnumPlugin from './vite_plugins/transformPermissionEnumPlugin';
import roleEnumPlugin from './vite_plugins/transformRoleEnumPlugin';

// Check for production or CI environment
// Primary check: use Laravel's APP_ENV (from .env file)
const isProduction = process.env.APP_ENV === 'production';

// Fallback checks for CI environments where .env might not be properly loaded
const isCI = process.env.CI === 'true' || 
             process.env.GITHUB_ACTIONS === 'true' || 
             process.env.NODE_ENV === 'production';

// Only load custom plugins in development environments and not CI
const shouldLoadDevPlugins = !isProduction && !isCI;
const customDevPlugins = shouldLoadDevPlugins 
    ? [permissionEnumPlugin(), roleEnumPlugin(), intentEnumPlugin(), tanstackQueryKeysPlugin()]
    : [];

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        ...customDevPlugins,
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
