import { ROUTES } from '@/support/constants/routes';
import { GenericBreadcrumbItem } from '@/support/interfaces/others';
import { usePage } from '@inertiajs/react';

function generateDynamicBreadcrumbs(): GenericBreadcrumbItem[] {
    const { url } = usePage();

    // Parse the URL to handle query parameters
    const urlObj = new URL(window.location.origin + url);
    const pathWithoutQuery = urlObj.pathname;

    // Extract only the path part from the dashboard route
    const dashboardPath = new URL(route(`${ROUTES.DASHBOARD}.index`)).pathname;

    // Handle dashboard route
    if (pathWithoutQuery === dashboardPath) {
        return [
            {
                name: 'Home',
                link: route(`${ROUTES.DASHBOARD}.index`),
                active: true,
            },
        ];
    }

    const paths = pathWithoutQuery.split('/').filter(Boolean);

    const breadcrumbs: GenericBreadcrumbItem[] = paths.map((path, index) => {
        const isActive = index === paths.length - 1;

        // Format the name by replacing hyphens with spaces and capitalizing each word
        const name = path
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // Construct the link maintaining the same path structure
        const link = `/${paths.slice(0, index + 1).join('/')}`;

        // Add query parameters only to the active (last) breadcrumb if they exist
        const finalLink = isActive ? `${link}${urlObj.search}` : link;

        return {
            name,
            link: finalLink,
            active: isActive,
        };
    });

    // Add "Home" as the root breadcrumb
    breadcrumbs.unshift({
        name: 'Home',
        link: route(`${ROUTES.DASHBOARD}.index`),
        active: false,
    });

    return breadcrumbs;
}

export { generateDynamicBreadcrumbs };
