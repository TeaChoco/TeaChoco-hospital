//-Path: "TeaChoco-Hospital/src/pages/profile/AllowPage.tsx"
import env from '../../configs/env';
import { Link } from 'react-router-dom';
import { Allow } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import { useSocket } from '../../hooks/useSocket';
import Switch from '../../components/custom/Switch';
import Select from '../../components/custom/Select';
import { useEffect, useMemo, useState } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import QRScanner from '../../components/code/QRScanner';
import QRGenerator from '../../components/code/QRGenerator';
import type { SiginQrData } from '../../types/signin-qr.dto';

function AllowsSelects({
    title,
    allows,
    setAllows,
}: {
    title: string;
    allows: Allow[];
    setAllows: React.Dispatch<React.SetStateAction<Allow[]>>;
}) {
    return (
        <Paper variant="200" className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{title}</h3>
            {allows.map((allow, index) => (
                <div key={index} className="flex gap-2">
                    <Select
                        value={allow}
                        containerClassName="w-full"
                        onChange={(event) =>
                            setAllows((prev) =>
                                prev.map((item, i) =>
                                    i === index ? (event.target.value as Allow) : item,
                                ),
                            )
                        }
                        options={Object.keys(Allow).map((key) => ({ label: key, value: key }))}
                    />
                    <button
                        className="btn btn-error"
                        onClick={() => setAllows((prev) => prev.filter((_, i) => i !== index))}>
                        <FaTrash />
                    </button>
                </div>
            ))}
            <button
                className="btn btn-primary w-full"
                onClick={() => setAllows((prev) => [...prev, Allow.AUTH])}>
                Add
            </button>
        </Paper>
    );
}

export default function AllowPage() {
    const { user } = useAuth();
    const expiresMax = 5 * 60 * 1000;
    const { id, emit } = useSocket();
    const [isScanner, setIsScanner] = useState(true);
    const [isExpiresAt, setIsExpiresAt] = useState(false);
    const [reads, setReads] = useState<Allow[]>([Allow.AUTH]);
    const [edits, setEdits] = useState<Allow[]>([Allow.AUTH]);
    const [expiresAt, setExpiresAt] = useState<Date>(new Date());
    const [qrExpiresAt, setQrExpiresAt] = useState<Date>(new Date());
    const [responseData, setResponseData] = useState<SiginQrData | undefined>(undefined);

    console.log(user);

    const getValue = () => {
        if (
            !id ||
            !user?.allows?.some(
                (allow) => allow.read.includes(Allow.AUTH) && allow.edit.includes(Allow.AUTH),
            )
        )
            return;
        setQrExpiresAt(new Date(Date.now() + expiresMax));
        const data: SiginQrData = {
            response: {
                socketId: id,
                expiresAt: qrExpiresAt,
                token: crypto.randomUUID(),
                user: {
                    ...user,
                    allows: [
                        {
                            user_id: user.user_id,
                            read: reads,
                            edit: edits,
                            expiresAt: isExpiresAt ? expiresAt : undefined,
                        },
                    ],
                },
            },
        };
        setResponseData(data);
    };

    useEffect(() => {
        getValue();
    }, [id, reads, edits, expiresAt, isExpiresAt]);

    const value = useMemo(() => {
        const url = env.clientUrl;
        if (responseData) {
            const { response } = responseData;
            if (response)
                return `${url}/signin?socketId=${response.socketId}&token=${response.token}`;
        }
    }, [responseData]);

    return (
        <div className="flex flex-col md:flex-row gap-2">
            <Paper className="w-full flex flex-col p-6 md:p-8 gap-4">
                <div className="flex items-center relative">
                    <Link to="/profile" className="btn-icon absolute">
                        <FaArrowLeft className="text-2xl" />
                    </Link>
                    <h2 className="text-3xl font-bold text-text-light dark:text-text-dark w-full text-center">
                        Allows
                    </h2>
                </div>
                <Paper variant="200" className="flex flex-col gap-2">
                    <label className="text-lg font-bold text-text-light dark:text-text-dark">
                        Expires At
                    </label>
                    <div className="flex items-center gap-2 w-full">
                        <Switch
                            checked={isExpiresAt}
                            onCheckedChange={(checked) => setIsExpiresAt(checked)}
                        />
                        <Input
                            type="datetime-local"
                            disabled={!isExpiresAt}
                            containerClassName="w-full"
                            value={new Date(
                                expiresAt.getTime() - expiresAt.getTimezoneOffset() * 60000,
                            )
                                .toISOString()
                                .slice(0, 16)}
                            onChange={(event) => setExpiresAt(new Date(event.target.value))}
                        />
                    </div>
                </Paper>
                <AllowsSelects title="Read" allows={reads} setAllows={setReads} />
                <AllowsSelects title="Edit" allows={edits} setAllows={setEdits} />
            </Paper>
            <Paper variant="200" className="flex flex-col gap-2 w-full md:max-w-md">
                <button onClick={() => setIsScanner((prev) => !prev)} className="btn btn-secondary">
                    {isScanner ? 'generate' : 'scan'}
                </button>
                {isScanner ? (
                    <QRScanner
                        header="Scan to Login"
                        onScan={(result) => {
                            const data: SiginQrData = JSON.parse(result);
                            console.log(data);
                            if (data.request) emit('signin-qr', data.request);
                            else console.log(data, 'is not RequestSocketData');
                        }}
                    />
                ) : (
                    <QRGenerator
                        value={value}
                        refresh={getValue}
                        header="Scan to Login"
                        expiresAt={qrExpiresAt}
                        expiresMax={expiresMax}
                    />
                )}
            </Paper>
        </div>
    );
}
