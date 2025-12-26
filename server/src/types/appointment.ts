//-Path: "TeaChoco-Hospital/server/src/types/appointment.ts"

export enum AppointmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    SCHEDULED = 'scheduled',
    CHECKED_IN = 'checked_in',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    NO_SHOW = 'no_show',
    RESCHEDULED = 'rescheduled',
}

export enum AppointmentType {
    CONSULTATION = 'consultation',
    FOLLOW_UP = 'follow_up',
    SPECIALIST = 'specialist',
    EMERGENCY = 'emergency',
    VACCINATION = 'vaccination',
    LAB_TEST = 'lab_test',
    IMAGING = 'imaging',
    SURGERY = 'surgery',
    PHYSICAL_THERAPY = 'physical_therapy',
    DENTAL = 'dental',
    EYE_EXAM = 'eye_exam',
    OTHER = 'other',
}

export enum UrgencyLevel {
    ROUTINE = 'routine',
    URGENT = 'urgent',
    EMERGENCY = 'emergency',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PARTIAL = 'partial',
    PAID = 'paid',
    INSURANCE = 'insurance',
    FREE = 'free',
    CANCELLED = 'cancelled',
}

export enum PaymentMethod {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BANK_TRANSFER = 'bank_transfer',
    QR_CODE = 'qr_code',
    MOBILE_BANKING = 'mobile_banking',
    INSURANCE = 'insurance',
    GOVERNMENT = 'government',
    OTHER = 'other',
}

export enum PatientType {
    NEW = 'new',
    RETURNING = 'returning',
    REFERRAL = 'referral',
    EMERGENCY = 'emergency',
}

export enum AppointmentLocation {
    OPD = 'opd',
    ER = 'emergency_room',
    IPD = 'inpatient',
    OR = 'operating_room',
    LAB = 'laboratory',
    IMAGING = 'imaging_room',
    PHARMACY = 'pharmacy',
    PHYSICAL_THERAPY = 'pt_room',
    DENTAL = 'dental_clinic',
    EYE_CLINIC = 'eye_clinic',
    HOME_VISIT = 'home_visit',
    TELEMEDICINE = 'telemedicine',
}

export enum PreparationType {
    FASTING = 'fasting',
    WATER_ONLY = 'water_only',
    MEDICATION_HOLD = 'medication_hold',
    FULL_BLADDER = 'full_bladder',
    EMPTY_BLADDER = 'empty_bladder',
    NO_MAKEUP = 'no_makeup',
    NO_LOTION = 'no_lotion',
    BRING_MEDICINES = 'bring_medicines',
    BRING_RECORDS = 'bring_records',
    BRING_INSURANCE = 'bring_insurance',
    SPECIAL_CLOTHING = 'special_clothing',
    OTHER = 'other',
}

export enum CategoryType {
    DOCTOR = 'doctor',
    NURSE = 'nurse',
    RECEPTION = 'reception',
    PHARMACIST = 'pharmacist',
}
