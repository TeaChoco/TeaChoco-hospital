// - Path: "TeaChoco-Hospital/client/src/pages/profile/PermissionRow.tsx"
import type { Allow } from '../../types/auth';
import Switch from '../../components/custom/Switch';

/**
 * @description Permission Matrix row component
 */
export function PermissionRow({
    label,
    value,
    onChange,
}: {
    value: Allow;
    label: string;
    onChange: (newValue: Allow) => void;
}) {
    return (
        <tr className="group border-b border-border-light/40 dark:border-border-dark/40 last:border-0 hover:bg-primary/5 transition-colors duration-300">
            <td className="py-4 px-2 font-semibold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                {label}
            </td>
            <td className="py-4 text-center">
                <div className="flex justify-center">
                    <Switch
                        checked={value.read}
                        onCheckedChange={(checked) => onChange({ ...value, read: checked })}
                    />
                </div>
            </td>
            <td className="py-4 text-center">
                <div className="flex justify-center">
                    <Switch
                        checked={value.edit}
                        onCheckedChange={(checked) => onChange({ ...value, edit: checked })}
                    />
                </div>
            </td>
        </tr>
    );
}
