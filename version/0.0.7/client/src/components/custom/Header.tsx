//-Path: "TeaChoco-Hospital/client/src/components/custom/Header.tsx"

export default function Header({ header, description }: { header: string; description: string }) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">{header}</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">{description}</p>
        </div>
    );
}
