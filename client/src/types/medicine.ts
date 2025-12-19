//-Path: "TeaChoco-Hospital/client/src/types/medicine.ts"

export enum MealTime {
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
    SLEEP = 'sleep',
    ANYTIME = 'anytime',
    AS_NEEDED = 'as_needed',
}

export enum FoodRelation {
    BEFORE = 'before', // ก่อนอาหาร
    AFTER = 'after', // หลังอาหาร
    WITH = 'with', // พร้อมอาหาร
    EMPTY_STOMACH = 'empty_stomach', // รับประทานขณะท้องว่าง
}

export enum TimeUnit {
    MINUTES = 'minutes',
    HOURS = 'hours',
    DAYS = 'days',
}

export enum MedicineUnit {
    TABLET = 'tablet', // เม็ด
    CAPSULE = 'capsule', // แคปซูล
    ML = 'ml', // มิลลิลิตร
    DROP = 'drop', // หยด
    PUMP = 'pump', // ปั๊ม
    PATCH = 'patch', // แผ่นแปะ
    INHALATION = 'inhalation', // สูดพ่น
    SUPPOSITORY = 'suppository', // ยาสอด
    OINTMENT = 'ointment', // ยาทา
    INJECTION = 'injection', // ยาฉีด
    OTHER = 'other', // อื่นๆ
}

export enum MedicineType {
    TABLET = 'tablet', // ยาเม็ด
    CAPSULE = 'capsule', // แคปซูล
    SYRUP = 'syrup', // ยาน้ำ
    INJECTION = 'injection', // ยาฉีด
    OINTMENT = 'ointment', // ยาทา
    DROPS = 'drops', // ยาหยอด
    INHALER = 'inhaler', // ยาพ่น
    SUPPOSITORY = 'suppository', // ยาสอด
}

export enum StorageCondition {
    ROOM_TEMP = 'room_temp', // อุณหภูมิห้อง
    REFRIGERATED = 'refrigerated', // ตู้เย็น (2-8°C)
    PROTECT_FROM_LIGHT = 'protect_from_light', // หลีกเลี่ยงแสง
    PROTECT_FROM_MOISTURE = 'protect_from_moisture', // หลีกเลี่ยงความชื้น
    FREEZER = 'freezer', // แช่แข็ง
}

export enum SeverityLevel {
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

export interface TimeInterval {
    value: number;
    unit: TimeUnit;
    description?: string; // เช่น "ก่อนอาหาร 30 นาที"
}

export interface TakeInstruction {
    mealTime: MealTime;
    relation?: FoodRelation;
    interval?: TimeInterval; // เวลาที่ต้องรอก่อน/หลังอาหาร
    notes?: string; // หมายเหตุเพิ่มเติม
}

export interface MedicineDosage {
    unit: MedicineUnit; // หน่วย เช่น เม็ด, แคปซูล, มิลลิลิตร
    quantity: number; // จำนวนที่ต้องรับประทานในแต่ละครั้ง
    frequencyPerDay: number; // จำนวนครั้งต่อวัน
    duration?: {
        // ระยะเวลาการใช้ยา (ถ้ามี)
        value: number;
        unit: TimeUnit;
    };
    maximumDosage?: number; // จำนวนสูงสุดที่รับได้ต่อวัน (ถ้ามี)
    instructions?: string; // คำแนะนำพิเศษ
}

export interface PackageInfo {
    boxes?: number; // จำนวนกล่อง
    stripsPerBox?: number; // จำนวนแผงต่อกล่อง
    tabletsPerStrip: number; // จำนวนเม็ดต่อแผง
}

export interface HospitalInfo {
    hospitalId: string; // รหัสโรงพยาบาล
    doctorId?: string; // รหัสแพทย์ผู้สั่งยา
    department?: string; // แผนกที่จ่ายยา
    prescriptionDate: Date; // วันที่สั่งยา
    dispenseDate: Date; // วันที่จ่ายยา
}

export interface SideEffect {
    description: string; // อาการข้างเคียง
    severity: 'mild' | 'moderate' | 'severe';
    probability: 'rare' | 'uncommon' | 'common' | 'very_common';
    action?: string; // วิธีปฏิบัติเมื่อเกิดอาการ
}

export interface Warning {
    description: string; // คำอธิบาย
    severity: SeverityLevel;
}

export interface Medicine {
    // Basic Information
    _id: string;
    user_id: string;
    name: string; // ชื่อยา (ทางการค้า)
    genericName: string; // ชื่อสามัญทางยา
    brand?: string; // ยี่ห้อ

    // Type and Category
    type: MedicineType; // รูปแบบยา
    category?: string; // หมวดหมู่ (เช่น ยาแก้ปวด, ยาปฏิชีวนะ)

    // Usage Information
    takeInstructions: TakeInstruction[]; // คำแนะนำเกี่ยวกับการรับประทาน
    dosage: MedicineDosage; // ขนาดและวิธีใช้

    // Timing Information
    startDate: Date; // วันที่เริ่มรับประทาน
    endDate: Date; // วันที่สิ้นสุดการรับประทาน (หรือวันที่ยาหมดอายุ)
    expiryDate: Date; // วันหมดอายุของยา

    // Storage Information
    storageConditions: StorageCondition[]; // วิธีการเก็บรักษา
    storageNotes?: string; // หมายเหตุการเก็บรักษาเพิ่มเติม

    // Package Information
    package: PackageInfo; // ข้อมูลบรรจุภัณฑ์

    // Hospital Information
    hospital: HospitalInfo; // ข้อมูลโรงพยาบาลที่จ่ายยา

    // Additional Information
    sideEffects: SideEffect[]; // ผลข้างเคียง
    warnings: Warning[]; // คำเตือนพิเศษ

    // Images and Documents
    imageUrl?: string; // รูปภาพยา
    qrCode?: string; // QR Code สำหรับยา
    barcode?: string; // บาร์โค้ด

    // Tracking Information
    createdAt: Date;
    updatedAt: Date;
    createdBy: string; // User ID ผู้สร้าง
    updatedBy?: string; // User ID ผู้แก้ไขล่าสุด

    // Status
    isActive: boolean; // ยังใช้ยาอยู่หรือไม่
    isCompleted: boolean; // รับประทานครบแล้วหรือยัง
}

export interface MedicineResponse {
    success: boolean;
    data?: Medicine | Medicine[];
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
}

// สำหรับ search/filter
export interface MedicineFilter {
    name?: string;
    genericName?: string;
    type?: MedicineType;
    category?: string;
    hospitalId?: string;
    doctorId?: string;
    startDateFrom?: Date;
    startDateTo?: Date;
    endDateFrom?: Date;
    endDateTo?: Date;
    isActive?: boolean;
    isCompleted?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// สำหรับ statistics
export interface MedicineStatistics {
    totalMedicines: number;
    activeMedicines: number;
    completedMedicines: number;
    upcomingExpiry: number; // ยาที่ใกล้หมดอายุ (ภายใน 7 วัน)
    adherenceRate: number;
    byType: Record<MedicineType, number>;
    byHospital: Record<string, number>;
}
