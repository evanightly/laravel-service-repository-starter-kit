import { useAppearance } from '@/hooks/use-appearance';

const DarkModeToggler = () => {
    const { appearance, updateAppearance } = useAppearance();
    const isDarkMode = appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleDarkMode = () => {
        if (appearance === 'dark') {
            updateAppearance('light');
        } else if (appearance === 'light') {
            updateAppearance('dark');
        } else {
            updateAppearance('dark');
        }
    };

    return (
        <>
            <input checked={isDarkMode} className='peer absolute -left-[65rem]' id='dn-toggle-bs' onChange={toggleDarkMode} type='checkbox' />
            <label
                className='toggle relative inline-block h-6 w-12 cursor-pointer overflow-clip rounded-full border border-sky-300 bg-sky-300 transition-colors duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-disabled:cursor-not-allowed peer-checked:[&_.crater]:opacity-100 peer-checked:[&_.star-1]:top-3 peer-checked:[&_.star-1]:left-2 peer-checked:[&_.star-1]:h-0.5 peer-checked:[&_.star-1]:w-0.5 peer-checked:[&_.star-2]:top-1.5 peer-checked:[&_.star-2]:left-4 peer-checked:[&_.star-2]:h-1 peer-checked:[&_.star-2]:w-1 peer-checked:[&_.star-3]:top-4 peer-checked:[&_.star-3]:left-4 peer-checked:[&_.star-3]:h-0.5 peer-checked:[&_.star-3]:w-0.5 peer-checked:[&_.toggle-handler]:-left-4 peer-checked:[&_.toggle-handler]:translate-x-10 peer-checked:[&_.toggle-handler]:rotate-0 peer-checked:[&_.toggle-handler]:bg-amber-100'
                htmlFor='dn-toggle-bs'
            >
                <span className='toggle-handler relative top-0 left-0 z-10 inline-block h-6 w-6 -rotate-45 rounded-full bg-amber-300 shadow transition-all duration-[400ms]'>
                    <span className='crater absolute top-2 left-1 h-px w-px rounded-full bg-amber-200 opacity-0 transition-opacity duration-200'></span>
                    <span className='crater absolute top-3.5 left-2.5 h-1 w-1 rounded-full bg-amber-200 opacity-0 transition-opacity duration-200'></span>
                    <span className='crater absolute top-1 left-3 h-1.5 w-1.5 rounded-full bg-amber-200 opacity-0 transition-opacity duration-200'></span>
                </span>
                <span className='star-1 absolute top-4 left-3 h-4 w-4 rounded-full bg-white transition-all duration-300'></span>
                <span className='star-2 absolute top-3.5 left-6 h-4 w-4 rounded-full bg-white transition-all duration-300'></span>
                <span className='star-3 absolute top-2 left-9 h-5 w-5 rounded-full bg-white transition-all duration-300'></span>
                <span className='sr-only'>toggle switch</span>
            </label>
        </>
    );
};

export default DarkModeToggler;
