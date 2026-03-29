<<<<<<< Updated upstream
//-Path: "TeaChoco-Hospital/client/src/types/appointment.ts"
import type { Doctor } from './doctor';
import type { Hospital } from './hospital';
import type { Medicine } from './medicine';
import type { ApiData } from './types';

// สถานะการนัดหมาย
export enum AppointmentStatus {
    PENDING = 'pending', // รอการยืนยัน
    CONFIRMED = 'confirmed', // ยืนยันแล้ว
    SCHEDULED = 'scheduled', // จัดตารางเวลาแล้ว
    CHECKED_IN = 'checked_in', // เช็คอินแล้ว
    IN_PROGRESS = 'in_progress', // กำลังพบแพทย์
    COMPLETED = 'completed', // เสร็จสิ้น
    CANCELLED = 'cancelled', // ยกเลิก
    NO_SHOW = 'no_show', // ไม่มาตามนัด
    RESCHEDULED = 'rescheduled', // เลื่อนนัด
}

// ประเภทการนัดหมาย
export enum AppointmentType {
    CONSULTATION = 'consultation', // ตรวจทั่วไป
    FOLLOW_UP = 'follow_up', // นัดติดตาม
    SPECIALIST = 'specialist', // ตรวจเฉพาะทาง
    EMERGENCY = 'emergency', // ฉุกเฉิน
    VACCINATION = 'vaccination', // รับวัคซีน
    LAB_TEST = 'lab_test', // ตรวจแลป
    IMAGING = 'imaging', // ตรวจภาพถ่าย
    SURGERY = 'surgery', // ผ่าตัด
    PHYSICAL_THERAPY = 'physical_therapy', // กายภาพบำบัด
    DENTAL = 'dental', // ทันตกรรม
    EYE_EXAM = 'eye_exam', // ตรวจตา
    OTHER = 'other', // อื่นๆ
}

// ความเร่งด่วน
export enum UrgencyLevel {
    ROUTINE = 'routine', // ปกติ
    URGENT = 'urgent', // เร่งด่วน
    EMERGENCY = 'emergency', // ฉุกเฉิน
}

// ประเภทการชำระเงิน
export enum PaymentStatus {
    PENDING = 'pending', // รอชำระ
    PARTIAL = 'partial', // ชำระบางส่วน
    PAID = 'paid', // ชำระครบ
    INSURANCE = 'insurance', // ประกันครอบคลุม
    FREE = 'free', // ไม่มีค่าใช้จ่าย
    CANCELLED = 'cancelled', // ยกเลิกการชำระ
}

// วิธีการชำระเงิน
export enum PaymentMethod {
    CASH = 'cash', // เงินสด
    CREDIT_CARD = 'credit_card', // บัตรเครดิต
    DEBIT_CARD = 'debit_card', // บัตรเดบิต
    BANK_TRANSFER = 'bank_transfer', // โอนเงิน
    QR_CODE = 'qr_code', // QR Payment
    MOBILE_BANKING = 'mobile_banking', // Mobile Banking
    INSURANCE = 'insurance', // ประกันสุขภาพ
    GOVERNMENT = 'government', // หลักประกันสุขภาพถ้วนหน้า
    OTHER = 'other', // อื่นๆ
}

// ประเภทผู้ป่วย
export enum PatientType {
    NEW = 'new', // ผู้ป่วยใหม่
    RETURNING = 'returning', // ผู้ป่วยเก่า
    REFERRAL = 'referral', // ผู้ป่วยส่งต่อ
    EMERGENCY = 'emergency', // ผู้ป่วยฉุกเฉิน
}

// สถานที่ตรวจ
export enum AppointmentLocation {
    OPD = 'opd', // ตรวจผู้ป่วยนอก
    ER = 'emergency_room', // ห้องฉุกเฉิน
    IPD = 'inpatient', // ผู้ป่วยใน
    OR = 'operating_room', // ห้องผ่าตัด
    LAB = 'laboratory', // ห้องแลป
    IMAGING = 'imaging_room', // ห้องถ่ายภาพ
    PHARMACY = 'pharmacy', // ร้านขายยา
    PHYSICAL_THERAPY = 'pt_room', // ห้องกายภาพ
    DENTAL = 'dental_clinic', // คลินิกทันตกรรม
    EYE_CLINIC = 'eye_clinic', // คลินิกตา
    HOME_VISIT = 'home_visit', // ตรวจที่บ้าน
    TELEMEDICINE = 'telemedicine', // Telemedicine
}

// การเตรียมตัวก่อนนัดหมาย
export enum PreparationType {
    FASTING = 'fasting', // งดน้ำและอาหาร
    WATER_ONLY = 'water_only', // ดื่มน้ำได้เท่านั้น
    MEDICATION_HOLD = 'medication_hold', // หยุดยาบางชนิด
    FULL_BLADDER = 'full_bladder', // กลั้นปัสสาวะ
    EMPTY_BLADDER = 'empty_bladder', // ปัสสาวะให้หมด
    NO_MAKEUP = 'no_makeup', // ไม่แต่งหน้า
    NO_LOTION = 'no_lotion', // ไม่ทาครีม
    BRING_MEDICINES = 'bring_medicines', // นำยามาแสดง
    BRING_RECORDS = 'bring_records', // นำเอกสารมา
    BRING_INSURANCE = 'bring_insurance', // นำบัตรประกัน
    SPECIAL_CLOTHING = 'special_clothing', // สวมเสื้อผ้าพิเศษ
    OTHER = 'other', // อื่นๆ
}

export enum CategoryType {
    DOCTOR = 'doctor',
    NURSE = 'nurse',
    RECEPTION = 'reception',
    PHARMACIST = 'pharmacist',
}

export interface AppointmentPreparation {
    types: PreparationType[];
    description?: string;
    instructions: string[];
    fastingHours?: number; // จำนวนชั่วโมงที่ต้องงด
    medicationInstructions?: string;
    specialNotes?: string;
}

export interface InsuranceInfo {
    providerId: string; // รหัสบริษัทประกัน
    providerName: string; // ชื่อบริษัทประกัน
    policyNumber: string; // เลขที่กรมธรรม์
    coverageType: string; // ประเภทความคุ้มครอง
    coverageAmount?: number; // วงเงินคุ้มครอง
    remainingAmount?: number; // วงเงินคงเหลือ
    isVerified: boolean; // ตรวจสอบแล้วหรือยัง
    verificationDate?: Date; // วันที่ตรวจสอบ
    notes?: string; // หมายเหตุ
}

export interface AppointmentPayment {
    totalAmount: number; // ยอดรวม
    insuranceCoverage?: number; // ประกันจ่าย
    patientResponsibility: number; // ส่วนที่ผู้ป่วยจ่าย
    discount?: number; // ส่วนลด
    vat?: number; // VAT
    netAmount: number; // ยอดสุทธิ
    paidAmount: number; // จำนวนที่ชำระแล้ว
    balance: number; // ค้างชำระ
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod[];
    paymentDate?: Date; // วันที่ชำระ
    transactionId?: string; // รหัสธุรกรรม
    receiptNumber?: string; // เลขที่ใบเสร็จ
    notes?: string; // หมายเหตุการชำระ
}

export interface Symptom {
    description: string; // อาการ
    severity: 'mild' | 'moderate' | 'severe';
    duration?: string; // ระยะเวลาที่มีอาการ
    onset?: Date; // วันที่เริ่มมีอาการ
    notes?: string; // หมายเหตุ
}

export interface VitalSign {
    bloodPressure?: string; // ความดันโลหิต
    heartRate?: number; // อัตราการเต้นของหัวใจ
    respiratoryRate?: number; // อัตราการหายใจ
    temperature?: number; // อุณหภูมิร่างกาย
    oxygenSaturation?: number; // ออกซิเจนในเลือด
    weight?: number; // น้ำหนัก
    height?: number; // ส่วนสูง
    bmi?: number; // ดัชนีมวลกาย
    measuredAt: Date; // เวลาที่วัด
    measuredBy?: string; // ผู้วัด
    notes?: string; // หมายเหตุ
}

export interface MedicalRecordRef {
    recordId: string; // รหัสเวชระเบียน
    type: string; // ประเภทระเบียน
    title: string; // หัวข้อ
    date: Date; // วันที่
    attachmentUrl?: string; // ลิงค์ไฟล์แนบ
}

export interface FollowUpInfo {
    isRequired: boolean; // ต้องนัดติดตามหรือไม่
    recommendedDate?: Date; // วันที่แนะนำให้นัดครั้งต่อไป
    reason?: string; // เหตุผลที่ต้องติดตาม
    instructions?: string; // คำแนะนำก่อนนัดครั้งต่อไป
}

export interface AppointmentNote {
    noteId: string; // รหัสบันทึก
    content: string; // เนื้อหา
    author: string; // ผู้เขียน
    createdAt: Date; // วันที่เขียน
    isInternal: boolean; // เป็นบันทึกภายในหรือไม่
    category?: CategoryType;
}

export interface StatusHistory {
    // ประวัติสถานะ
    status: AppointmentStatus;
    changedAt: Date;
    changedBy: string;
    notes?: string;
}

// Interface หลักสำหรับการนัดหมาย
export type Appointment = ApiData<{
    // ข้อมูลพื้นฐาน
    appointmentNumber?: string; // เลขที่นัดหมาย (เช่น APT-2024-001)

    // ข้อมูลผู้ป่วย
    patientType: PatientType; // ประเภทผู้ป่วย

    // ข้อมูลโรงพยาบาลและแพทย์
    hospitalId: string; // รหัสโรงพยาบาล
    hospital?: Hospital; // ข้อมูลโรงพยาบาล (populated)
    doctor_id: string; // รหัสแพทย์
    doctor?: Doctor; // ข้อมูลแพทย์ (populated)
    department: string; // แผนก

    // ข้อมูลการนัดหมาย
    type: AppointmentType; // ประเภทการนัดหมาย
    subType?: string; // ประเภทย่อย (ถ้ามี)
    purpose: string; // วัตถุประสงค์การนัด
    description?: string; // คำอธิบายเพิ่มเติม

    // เวลา
    scheduledDate: Date; // วันที่นัด
    scheduledTime: Date; // เวลานัด
    expectedDuration: number; // ระยะเวลาที่คาดว่าใช้ (นาที)
    actualStartTime?: Date; // เวลาเริ่มจริง
    actualEndTime?: Date; // เวลาสิ้นสุดจริง
    checkInTime?: Date; // เวลาเช็คอิน
    checkOutTime?: Date; // เวลาเช็คเอาท์

    // สถานที่
    location: AppointmentLocation; // สถานที่ตรวจ
    roomNumber?: string; // เลขห้อง
    floor?: string; // ชั้น

    // สถานะ
    status: AppointmentStatus; // สถานะการนัดหมาย
    statusHistory: StatusHistory[];

    // ความเร่งด่วน
    urgency: UrgencyLevel; // ระดับความเร่งด่วน
    priority?: number; // ลำดับความสำคัญ (1-10)

    // การเตรียมตัว
    preparation: AppointmentPreparation; // การเตรียมตัวก่อนนัด
    remindersSent: boolean; // ส่งการแจ้งเตือนแล้วหรือยัง

    // อาการและการวินิจฉัยเบื้องต้น
    symptoms: Symptom[]; // อาการที่มาพบ
    preliminaryDiagnosis?: string; // การวินิจฉัยเบื้องต้น

    // การชำระเงิน
    payment: AppointmentPayment; // ข้อมูลการชำระเงิน
    insurance?: InsuranceInfo; // ข้อมูลประกัน

    // ยาและการรักษา
    prescribedMedicines?: string[]; // รายการยาที่จ่าย (Medicine IDs)
    medicines?: Medicine[]; // ข้อมูลยา (populated)
    treatmentPlan?: string; // แผนการรักษา

    // การตรวจร่างกาย
    vitalSigns?: VitalSign[]; // สัญญาณชีพ
    labResults?: MedicalRecordRef[]; // ผลแลป
    imagingResults?: MedicalRecordRef[]; // ผลตรวจภาพ

    // การติดตาม
    followUp: FollowUpInfo; // ข้อมูลการนัดติดตาม
    nextAppointmentId?: string; // รหัสการนัดครั้งต่อไป

    // บันทึกต่างๆ
    doctorNotes?: AppointmentNote[]; // บันทึกแพทย์
    nurseNotes?: AppointmentNote[]; // บันทึกพยาบาล
    patientNotes?: AppointmentNote[]; // บันทึกจากผู้ป่วย

    // การอ้างอิง
    referralFrom?: string; // อ้างอิงจาก (แพทย์/โรงพยาบาล)
    referralTo?: string; // อ้างอิงไปยัง
    previousAppointmentId?: string; // การนัดครั้งก่อน

    // เมตาดาต้า
    cancelledBy?: string; // ผู้ยกเลิก (ถ้ามี)
    cancellationReason?: string; // เหตุผลการยกเลิก
    noShowReason?: string; // เหตุผลที่ไม่มาตามนัด

    // ฟิลด์พิเศษ
    escorts?: string[]; // ชื่อผู้ติดตาม
}>;

export interface AppointmentFilter {
    doctorId?: string;
    hospitalId?: string;
    department?: string;
    type?: AppointmentType;
    status?: AppointmentStatus;
    dateFrom?: Date;
    dateTo?: Date;
    urgency?: UrgencyLevel;
    searchText?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface AppointmentResponse {
    success: boolean;
    data: Appointment[];
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
}
=======
//-Path: "TeaChoco-Hospital/client/src/types/appointment.ts"
import type { ApiData } from './types';
import type { Doctor } from './doctor';
import type { Hospital } from './hospital';
import type { Medicine } from './medicine';

// สถานะการนัดหมาย
export enum AppointmentStatus {
    PENDING = 'pending', // รอการยืนยัน
    CONFIRMED = 'confirmed', // ยืนยันแล้ว
    SCHEDULED = 'scheduled', // จัดตารางเวลาแล้ว
    CHECKED_IN = 'checked_in', // เช็คอินแล้ว
    IN_PROGRESS = 'in_progress', // กำลังพบแพทย์
    COMPLETED = 'completed', // เสร็จสิ้น
    CANCELLED = 'cancelled', // ยกเลิก
    NO_SHOW = 'no_show', // ไม่มาตามนัด
    RESCHEDULED = 'rescheduled', // เลื่อนนัด
}

// ประเภทการนัดหมาย
export enum AppointmentType {
    CONSULTATION = 'consultation', // ตรวจทั่วไป
    FOLLOW_UP = 'follow_up', // นัดติดตาม
    SPECIALIST = 'specialist', // ตรวจเฉพาะทาง
    EMERGENCY = 'emergency', // ฉุกเฉิน
    VACCINATION = 'vaccination', // รับวัคซีน
    LAB_TEST = 'lab_test', // ตรวจแลป
    IMAGING = 'imaging', // ตรวจภาพถ่าย
    SURGERY = 'surgery', // ผ่าตัด
    PHYSICAL_THERAPY = 'physical_therapy', // กายภาพบำบัด
    DENTAL = 'dental', // ทันตกรรม
    EYE_EXAM = 'eye_exam', // ตรวจตา
    OTHER = 'other', // อื่นๆ
}

// ความเร่งด่วน
export enum UrgencyLevel {
    ROUTINE = 'routine', // ปกติ
    URGENT = 'urgent', // เร่งด่วน
    EMERGENCY = 'emergency', // ฉุกเฉิน
}

// ประเภทการชำระเงิน
export enum PaymentStatus {
    PENDING = 'pending', // รอชำระ
    PARTIAL = 'partial', // ชำระบางส่วน
    PAID = 'paid', // ชำระครบ
    INSURANCE = 'insurance', // ประกันครอบคลุม
    FREE = 'free', // ไม่มีค่าใช้จ่าย
    CANCELLED = 'cancelled', // ยกเลิกการชำระ
}

// วิธีการชำระเงิน
export enum PaymentMethod {
    CASH = 'cash', // เงินสด
    CREDIT_CARD = 'credit_card', // บัตรเครดิต
    DEBIT_CARD = 'debit_card', // บัตรเดบิต
    BANK_TRANSFER = 'bank_transfer', // โอนเงิน
    QR_CODE = 'qr_code', // QR Payment
    MOBILE_BANKING = 'mobile_banking', // Mobile Banking
    INSURANCE = 'insurance', // ประกันสุขภาพ
    GOVERNMENT = 'government', // หลักประกันสุขภาพถ้วนหน้า
    OTHER = 'other', // อื่นๆ
}

// ประเภทผู้ป่วย
export enum PatientType {
    NEW = 'new', // ผู้ป่วยใหม่
    RETURNING = 'returning', // ผู้ป่วยเก่า
    REFERRAL = 'referral', // ผู้ป่วยส่งต่อ
    EMERGENCY = 'emergency', // ผู้ป่วยฉุกเฉิน
}

// สถานที่ตรวจ
export enum AppointmentLocation {
    OPD = 'opd', // ตรวจผู้ป่วยนอก
    ER = 'emergency_room', // ห้องฉุกเฉิน
    IPD = 'inpatient', // ผู้ป่วยใน
    OR = 'operating_room', // ห้องผ่าตัด
    LAB = 'laboratory', // ห้องแลป
    IMAGING = 'imaging_room', // ห้องถ่ายภาพ
    PHARMACY = 'pharmacy', // ร้านขายยา
    PHYSICAL_THERAPY = 'pt_room', // ห้องกายภาพ
    DENTAL = 'dental_clinic', // คลินิกทันตกรรม
    EYE_CLINIC = 'eye_clinic', // คลินิกตา
    HOME_VISIT = 'home_visit', // ตรวจที่บ้าน
    TELEMEDICINE = 'telemedicine', // Telemedicine
}

// การเตรียมตัวก่อนนัดหมาย
export enum PreparationType {
    FASTING = 'fasting', // งดน้ำและอาหาร
    WATER_ONLY = 'water_only', // ดื่มน้ำได้เท่านั้น
    MEDICATION_HOLD = 'medication_hold', // หยุดยาบางชนิด
    FULL_BLADDER = 'full_bladder', // กลั้นปัสสาวะ
    EMPTY_BLADDER = 'empty_bladder', // ปัสสาวะให้หมด
    NO_MAKEUP = 'no_makeup', // ไม่แต่งหน้า
    NO_LOTION = 'no_lotion', // ไม่ทาครีม
    BRING_MEDICINES = 'bring_medicines', // นำยามาแสดง
    BRING_RECORDS = 'bring_records', // นำเอกสารมา
    BRING_INSURANCE = 'bring_insurance', // นำบัตรประกัน
    SPECIAL_CLOTHING = 'special_clothing', // สวมเสื้อผ้าพิเศษ
    OTHER = 'other', // อื่นๆ
}

export enum CategoryType {
    DOCTOR = 'doctor',
    NURSE = 'nurse',
    RECEPTION = 'reception',
    PHARMACIST = 'pharmacist',
}

export interface AppointmentPreparation {
    types: PreparationType[];
    description?: string;
    instructions: string[];
    fastingHours?: number; // จำนวนชั่วโมงที่ต้องงด
    medicationInstructions?: string;
    specialNotes?: string;
}

export interface InsuranceInfo {
    providerId: string; // รหัสบริษัทประกัน
    providerName: string; // ชื่อบริษัทประกัน
    policyNumber: string; // เลขที่กรมธรรม์
    coverageType: string; // ประเภทความคุ้มครอง
    coverageAmount?: number; // วงเงินคุ้มครอง
    remainingAmount?: number; // วงเงินคงเหลือ
    isVerified: boolean; // ตรวจสอบแล้วหรือยัง
    verificationDate?: Date; // วันที่ตรวจสอบ
    notes?: string; // หมายเหตุ
}

export interface AppointmentPayment {
    totalAmount: number; // ยอดรวม
    insuranceCoverage?: number; // ประกันจ่าย
    patientResponsibility: number; // ส่วนที่ผู้ป่วยจ่าย
    discount?: number; // ส่วนลด
    vat?: number; // VAT
    netAmount: number; // ยอดสุทธิ
    paidAmount: number; // จำนวนที่ชำระแล้ว
    balance: number; // ค้างชำระ
    paymentStatus: PaymentStatus;
    paymentMethod?: PaymentMethod[];
    paymentDate?: Date; // วันที่ชำระ
    transactionId?: string; // รหัสธุรกรรม
    receiptNumber?: string; // เลขที่ใบเสร็จ
    notes?: string; // หมายเหตุการชำระ
}

export interface Symptom {
    description: string; // อาการ
    severity: 'mild' | 'moderate' | 'severe';
    duration?: string; // ระยะเวลาที่มีอาการ
    onset?: Date; // วันที่เริ่มมีอาการ
    notes?: string; // หมายเหตุ
}

export interface VitalSign {
    bloodPressure?: string; // ความดันโลหิต
    heartRate?: number; // อัตราการเต้นของหัวใจ
    respiratoryRate?: number; // อัตราการหายใจ
    temperature?: number; // อุณหภูมิร่างกาย
    oxygenSaturation?: number; // ออกซิเจนในเลือด
    weight?: number; // น้ำหนัก
    height?: number; // ส่วนสูง
    bmi?: number; // ดัชนีมวลกาย
    measuredAt: Date; // เวลาที่วัด
    measuredBy?: string; // ผู้วัด
    notes?: string; // หมายเหตุ
}

export interface MedicalRecordRef {
    recordId: string; // รหัสเวชระเบียน
    type: string; // ประเภทระเบียน
    title: string; // หัวข้อ
    date: Date; // วันที่
    attachmentUrl?: string; // ลิงค์ไฟล์แนบ
}

export interface FollowUpInfo {
    isRequired: boolean; // ต้องนัดติดตามหรือไม่
    recommendedDate?: Date; // วันที่แนะนำให้นัดครั้งต่อไป
    reason?: string; // เหตุผลที่ต้องติดตาม
    instructions?: string; // คำแนะนำก่อนนัดครั้งต่อไป
}

export interface AppointmentNote {
    noteId: string; // รหัสบันทึก
    content: string; // เนื้อหา
    author: string; // ผู้เขียน
    createdAt: Date; // วันที่เขียน
    isInternal: boolean; // เป็นบันทึกภายในหรือไม่
    category?: CategoryType;
}

export interface StatusHistory {
    // ประวัติสถานะ
    status: AppointmentStatus;
    changedBy: string;
    changedAt: Date;
    notes?: string;
}

export interface MedicalCertificate {
    issuer: string; // ผู้ออก (ชื่อแพทย์)
    diagnosis: string; // การวินิจฉัย
    issuedAt: Date; // วันที่ออกใบรับรอง
    certificateId: string; // เลขที่ใบรับรอง
    recommendations: string; // ข้อแนะนำ/ความเห็นแพทย์
    endDate?: Date; // วันที่สิ้นสุดพัก (ถ้ามี)
    startDate?: Date; // วันที่เริ่มต้นพัก (ถ้ามี)
    attachmentUrl?: string; // ลิงค์ไฟล์
}

// Interface หลักสำหรับการนัดหมาย
export type Appointment = ApiData<{
    // ข้อมูลพื้นฐาน
    appointmentNumber?: string; // เลขที่นัดหมาย (เช่น APT-2024-001)

    // ข้อมูลผู้ป่วย
    patientType: PatientType; // ประเภทผู้ป่วย

    // ข้อมูลโรงพยาบาลและแพทย์
    hospitalId: string; // รหัสโรงพยาบาล
    hospital?: Hospital; // ข้อมูลโรงพยาบาล (populated)
    doctor_id: string; // รหัสแพทย์
    doctor?: Doctor; // ข้อมูลแพทย์ (populated)
    department: string; // แผนก

    // ข้อมูลการนัดหมาย
    type: AppointmentType; // ประเภทการนัดหมาย
    subType?: string; // ประเภทย่อย (ถ้ามี)
    purpose: string; // วัตถุประสงค์การนัด
    description?: string; // คำอธิบายเพิ่มเติม

    // เวลา
    scheduledDate: Date; // วันที่นัด
    scheduledTime: Date; // เวลานัด
    expectedDuration: number; // ระยะเวลาที่คาดว่าใช้ (นาที)
    actualStartTime?: Date; // เวลาเริ่มจริง
    actualEndTime?: Date; // เวลาสิ้นสุดจริง
    checkInTime?: Date; // เวลาเช็คอิน
    checkOutTime?: Date; // เวลาเช็คเอาท์

    // สถานที่
    location: AppointmentLocation; // สถานที่ตรวจ
    roomNumber?: string; // เลขห้อง
    floor?: string; // ชั้น

    // สถานะ
    status: AppointmentStatus; // สถานะการนัดหมาย
    statusHistory: StatusHistory[];

    // ความเร่งด่วน
    urgency: UrgencyLevel; // ระดับความเร่งด่วน
    priority?: number; // ลำดับความสำคัญ (1-10)

    // การเตรียมตัว
    preparation: AppointmentPreparation; // การเตรียมตัวก่อนนัด
    remindersSent: boolean; // ส่งการแจ้งเตือนแล้วหรือยัง

    // อาการและการวินิจฉัยเบื้องต้น
    symptoms: Symptom[]; // อาการที่มาพบ
    preliminaryDiagnosis?: string; // การวินิจฉัยเบื้องต้น

    // การชำระเงิน
    payment: AppointmentPayment; // ข้อมูลการชำระเงิน
    insurance?: InsuranceInfo; // ข้อมูลประกัน

    // ยาและการรักษา
    prescribedMedicines?: string[]; // รายการยาที่จ่าย (Medicine IDs)
    medicines?: Medicine[]; // ข้อมูลยา (populated)
    treatmentPlan?: string; // แผนการรักษา

    // การตรวจร่างกาย
    vitalSigns?: VitalSign[]; // สัญญาณชีพ
    labResults?: MedicalRecordRef[]; // ผลแลป
    imagingResults?: MedicalRecordRef[]; // ผลตรวจภาพ
    medicalCertificate?: MedicalCertificate; // ใบรับรองแพทย์

    // การติดตาม
    followUp: FollowUpInfo; // ข้อมูลการนัดติดตาม
    nextAppointmentId?: string; // รหัสการนัดครั้งต่อไป

    // บันทึกต่างๆ
    doctorNotes?: AppointmentNote[]; // บันทึกแพทย์
    nurseNotes?: AppointmentNote[]; // บันทึกพยาบาล
    patientNotes?: AppointmentNote[]; // บันทึกจากผู้ป่วย

    // การอ้างอิง
    referralFrom?: string; // อ้างอิงจาก (แพทย์/โรงพยาบาล)
    referralTo?: string; // อ้างอิงไปยัง
    previousAppointmentId?: string; // การนัดครั้งก่อน

    // เมตาดาต้า
    cancelledBy?: string; // ผู้ยกเลิก (ถ้ามี)
    cancellationReason?: string; // เหตุผลการยกเลิก
    noShowReason?: string; // เหตุผลที่ไม่มาตามนัด

    // ฟิลด์พิเศษ
    escorts?: string[]; // ชื่อผู้ติดตาม
}>;

export interface AppointmentFilter {
    doctorId?: string;
    hospitalId?: string;
    department?: string;
    type?: AppointmentType;
    status?: AppointmentStatus;
    dateFrom?: Date;
    dateTo?: Date;
    urgency?: UrgencyLevel;
    searchText?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface AppointmentResponse {
    success: boolean;
    data: Appointment[];
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
}
>>>>>>> Stashed changes
