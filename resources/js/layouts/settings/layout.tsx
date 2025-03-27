import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className='px-4 py-6'>
            <Heading description='Manage your profile and account settings' title='Settings' />

            <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <aside className='w-full max-w-xl lg:w-48'>
                    <nav className='flex flex-col space-y-1 space-x-0'>
                        {sidebarNavItems.map((item) => (
                            <Button
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                                key={item.href}
                                size='sm'
                                variant='ghost'
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className='my-6 md:hidden' />

                <div className='flex-1 md:max-w-2xl'>
                    <section className='max-w-xl space-y-12'>{children}</section>
                </div>
            </div>
        </div>
    );
}
