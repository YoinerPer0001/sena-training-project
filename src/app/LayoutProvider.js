import { usePathname } from 'next/navigation';
import { NavHome } from '@/components/Nav/NavHome';

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname();
    return (
        <>
            {pathname != "/auth/login" ? <NavHome /> : ''}
            {children}
        </>
    )
};