//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalEditPage.tsx"
import { useMemo } from 'react';
import { Title } from '../../types/types';
import { hospitalAPI } from '../../services/api';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import type { OutApiData } from '../../types/types';
import type { Hospital } from '../../types/hospital';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';
import { FaGlobe, FaPhone, FaHospital, FaMapLocationDot, FaBuildingShield } from 'react-icons/fa6';

export default function HospitalEditPage() {
    const { hospitals, resetHospitals } = useHospitals();

    const newData: OutApiData<Hospital> = useMemo(
        () => ({
            name: '',
            address: '',
            contactNumber: '',
            website: '',
        }),
        [],
    );

    return (
        <EditLayout<Hospital>
            newData={newData}
            title={Title.HOSPITALS}
            onRemove={async (id) => {
                await hospitalAPI.remove(id);
                resetHospitals();
                return true;
            }}
            onSave={async (data, id) => {
                if (id === 'new') await hospitalAPI.create(data);
                else await hospitalAPI.update(id, data);
                resetHospitals();
                return true;
            }}
            find={(id) => hospitals?.find((h) => h._id === id)}>
            {(data, setData) => (
                <>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary shadow-xs">
                                <FaBuildingShield size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Institution Identity
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-primary/40 transition-all">
                            <Input
                                required
                                label="Hospital Name"
                                placeholder="e.g. St. Mary's General Hospital"
                                icon={<FaHospital className="text-primary/60" />}
                                value={data.name}
                                onChange={(e) =>
                                    setData((prev) => prev && { ...prev, name: e.target.value })
                                }
                            />
                            <Input
                                label="Official Website"
                                placeholder="https://www.hospital-example.com"
                                icon={<FaGlobe className="text-primary/60" />}
                                value={data.website || ''}
                                onChange={(e) =>
                                    setData((prev) => prev && { ...prev, website: e.target.value })
                                }
                            />
                        </Paper>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent shadow-xs">
                                <FaMapLocationDot size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Location & Connection
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-accent/40 transition-all">
                            <Input
                                label="Physical Address"
                                placeholder="123 Medical Ave, Health City, HC 12345"
                                icon={<FaMapLocationDot className="text-accent/60" />}
                                value={data.address || ''}
                                onChange={(e) =>
                                    setData((prev) => prev && { ...prev, address: e.target.value })
                                }
                            />
                            <Input
                                label="Primary Contact Number"
                                placeholder="+1 (234) 567-8900"
                                icon={<FaPhone className="text-accent/60" />}
                                value={data.contactNumber || ''}
                                onChange={(e) =>
                                    setData(
                                        (prev) =>
                                            prev && { ...prev, contactNumber: e.target.value },
                                    )
                                }
                            />
                        </Paper>
                    </div>

                    <div className="opacity-50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-center">
                            Institution profile securely encrypted and stored
                        </p>
                    </div>
                </>
            )}
        </EditLayout>
    );
}
