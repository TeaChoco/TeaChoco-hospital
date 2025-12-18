//-Path: "TeaChoco-Hospital/server/src/api/appointments/dto/appointment.ts"

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
