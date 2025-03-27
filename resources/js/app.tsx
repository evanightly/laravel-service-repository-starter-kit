import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { addRippleEffect } from './helpers';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            // Call addRippleEffect only if a ripple element or its descendant is clicked
            if (target.closest('.ripple')) {
                addRippleEffect(event as unknown as MouseEvent<HTMLElement>);
            }
        });

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    refetchInterval: 10 * 1000,
                    staleTime: 60 * 1000,
                },
            },
        });

        root.render(
            <LaravelReactI18nProvider fallbackLocale={'en'} files={import.meta.glob('/lang/*.json')} locale={'en'}>
                <QueryClientProvider client={queryClient}>
                    <SonnerToaster
                        closeButton
                        duration={2000}
                        richColors
                        theme='light'
                        toastOptions={
                            {
                                // https://github.com/shadcn-ui/ui/issues/2234
                            }
                        }
                    />
                    <App {...props} />
                </QueryClientProvider>
            </LaravelReactI18nProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
