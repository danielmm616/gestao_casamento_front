import { User } from 'lucide-react';
import './GuestNamesList.css';

export function GuestNamesList({ names }: { names: string[] }) {
  return (
    <ul className="guest-names-list">
      {names.map((name: string, i: number) => (
        <li key={i} className="flex items-center gap-2">
          <User size={16} className="text-gray-500" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
