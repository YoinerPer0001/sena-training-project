import styles from './DangerMessage.scss'
import { CircleX } from 'lucide-react';

export default function DangerMessage({ children }) {
    return (<span className="flex items-center text-red-500 gap-2 text-xs font-semibold">
        <CircleX size={14}/>{children}</span>)
}