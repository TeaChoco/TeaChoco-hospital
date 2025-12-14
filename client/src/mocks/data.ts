//-Path: "TeaChoco-Hospital/client/src/mocks/data.ts"
import {
    MealTime,
    TimeUnit,
    FoodRelation,
    MedicineType,
    MedicineUnit,
    SeverityLevel,
    StorageCondition,
} from '../types/medicine';
import {
    PatientType,
    UrgencyLevel,
    PaymentStatus,
    AppointmentType,
    AppointmentStatus,
    AppointmentLocation,
} from '../types/appointment';
import type { Doctor } from '../types/doctor';
import type { Hospital } from '../types/hospital';
import type { Medicine } from '../types/medicine';
import type { Appointment } from '../types/appointment';

export const mockHospitals: Hospital[] = [
    {
        _id: 'hosp_001',
        name: 'โรงพยาบาลทีช็อคโก้ (TeaChoco Hospital)',
        address: '123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110',
        contactNumber: '02-123-4567',
        website: 'https://hospital.teachoco.com',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        _id: 'hosp_002',
        name: 'คลินิกหมอใจดี',
        address: '456 ซ.ทองหล่อ กทม.',
        contactNumber: '02-987-6543',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
];

export const mockDoctors: Doctor[] = [
    {
        _id: 'doc_001',
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        nickname: 'หมอสม',
        department: 'อายุรกรรม (Internal Medicine)',
        contactNumber: '081-234-5678',
        picture:
            'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        _id: 'doc_002',
        firstName: 'วิภา',
        lastName: 'รักรักษา',
        nickname: 'หมอวิ',
        department: 'กุมารเวชกรรม (Pediatrics)',
        contactNumber: '089-876-5432',
        picture:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdvbWFuJTIwZG9jdG9yfGVufDB8fDB8fHww',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        _id: 'doc_003',
        firstName: 'ณัฐ',
        lastName: 'มั่นคง',
        department: 'ศัลยกรรมกระดูก (Orthopedics)',
        picture:
            'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fZG9jdG9yfGVufDB8fDB8fHww',
        createdAt: new Date('2024-01-01'),
    },
];

export const mockMedicines: Medicine[] = [
    {
        _id: 'med_001',
        name: 'Paracetamol',
        genericName: 'Paracetamol 500mg',
        brand: 'Sara',
        type: MedicineType.TABLET,
        category: 'ยาแก้ปวด ลดไข้',
        takeInstructions: [
            {
                mealTime: MealTime.ANYTIME,
                relation: FoodRelation.AFTER,
                notes: 'ทานเมื่อมีอาการปวดหรือมีไข้ ห่างกันทุก 4-6 ชั่วโมง',
            },
        ],
        dosage: {
            unit: MedicineUnit.TABLET,
            quantity: 1,
            frequencyPerDay: 4,
        },
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        expiryDate: new Date('2026-12-31'),
        storageConditions: [StorageCondition.ROOM_TEMP],
        package: {
            boxes: 1,
            stripsPerBox: 10,
            tabletsPerStrip: 10,
        },
        hospital: {
            hospitalId: 'hosp_001',
            prescriptionDate: new Date(),
            dispenseDate: new Date(),
        },
        sideEffects: [],
        warnings: [
            {
                description: 'ห้ามรับประทานเกินวันละ 8 เม็ด',
                severity: SeverityLevel.WARNING,
            },
        ],
        imageUrl: 'https://pharmacy.mahidol.ac.th/th/knowledge/images/0426.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'admin',
        __v: 0,
        isActive: true,
        isCompleted: false,
    },
    {
        _id: 'med_002',
        name: 'Amoxicillin',
        genericName: 'Amoxicillin 500mg',
        type: MedicineType.CAPSULE,
        category: 'ยาฆ่าเชื้อ',
        takeInstructions: [
            {
                mealTime: MealTime.BREAKFAST,
                relation: FoodRelation.AFTER,
            },
            {
                mealTime: MealTime.LUNCH,
                relation: FoodRelation.AFTER,
            },
            {
                mealTime: MealTime.DINNER,
                relation: FoodRelation.AFTER,
            },
        ],
        dosage: {
            unit: MedicineUnit.CAPSULE,
            quantity: 1,
            frequencyPerDay: 3,
            duration: {
                value: 7,
                unit: TimeUnit.DAYS,
            },
        },
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        expiryDate: new Date('2025-06-30'),
        storageConditions: [StorageCondition.ROOM_TEMP, StorageCondition.PROTECT_FROM_MOISTURE],
        package: {
            tabletsPerStrip: 10,
        },
        hospital: {
            hospitalId: 'hosp_001',
            doctorId: 'doc_001',
            prescriptionDate: new Date(),
            dispenseDate: new Date(),
        },
        sideEffects: [
            {
                description: 'อาจมีอาการท้องเสีย',
                severity: 'mild',
                probability: 'common',
            },
        ],
        warnings: [
            {
                description: 'ต้องรับประทานติดต่อกันจนหมด',
                severity: SeverityLevel.DANGER,
            },
            {
                description: 'ห้ามใช้ในผู้ที่แพ้ยากลุ่ม Penicillin',
                severity: SeverityLevel.DANGER,
            },
        ],
        imageUrl:
            'https://5.imimg.com/data5/SELLER/Default/2023/1/VR/OY/QJ/134468648/amoxicillin-capsules-ip-500mg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'admin',
        __v: 0,
        isActive: true,
        isCompleted: false,
    },
    {
        _id: 'med_003',
        name: 'Loratadine',
        genericName: 'Loratadine 10mg',
        type: MedicineType.TABLET,
        category: 'ยาแก้แพ้',
        takeInstructions: [
            {
                mealTime: MealTime.SLEEP,
                relation: FoodRelation.BEFORE,
            },
        ],
        dosage: {
            unit: MedicineUnit.TABLET,
            quantity: 1,
            frequencyPerDay: 1,
        },
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        expiryDate: new Date('2026-05-20'),
        storageConditions: [StorageCondition.ROOM_TEMP],
        package: {
            tabletsPerStrip: 10,
        },
        hospital: {
            hospitalId: 'hosp_002',
            prescriptionDate: new Date(),
            dispenseDate: new Date(),
        },
        sideEffects: [
            {
                description: 'ง่วงซึมเล็กน้อย',
                severity: 'mild',
                probability: 'common',
            },
        ],
        warnings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'admin',
        __v: 0,
        isActive: true,
        isCompleted: false,
    },
];

export const mockAppointments: Appointment[] = [
    {
        _id: 'apt_001',
        appointmentNumber: 'APT-2024-001',
        patientId: 'pat_001',
        patientName: 'คุณผู้ป่วย น่ารัก',
        patientType: PatientType.RETURNING,
        hospitalId: 'hosp_001',
        hospital: mockHospitals[0],
        doctorId: 'doc_001',
        doctor: mockDoctors[0],
        department: 'อายุรกรรม',
        type: AppointmentType.FOLLOW_UP,
        purpose: 'ติดตามอาการไข้หวัด',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
        scheduledTime: new Date(new Date().setHours(9, 0, 0, 0)),
        expectedDuration: 30,
        location: AppointmentLocation.OPD,
        status: AppointmentStatus.CONFIRMED,
        statusHistory: [],
        urgency: UrgencyLevel.ROUTINE,
        preparation: {
            types: [],
            instructions: ['นำใบนัดมาด้วย'],
        },
        remindersSent: false,
        symptoms: [],
        payment: {
            totalAmount: 500,
            patientResponsibility: 500,
            netAmount: 500,
            paidAmount: 0,
            balance: 500,
            paymentStatus: PaymentStatus.PENDING,
        },
        followUp: {
            isRequired: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        __v: 0,
    },
    {
        _id: 'apt_002',
        appointmentNumber: 'APT-2024-002',
        patientId: 'pat_001',
        patientName: 'คุณผู้ป่วย น่ารัก',
        patientType: PatientType.RETURNING,
        hospitalId: 'hosp_001',
        doctorId: 'doc_002',
        doctor: mockDoctors[1],
        department: 'กุมารเวชกรรม',
        type: AppointmentType.VACCINATION,
        purpose: 'ฉีดวัคซีนไข้หวัดใหญ่',
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
        scheduledTime: new Date(new Date().setHours(13, 30, 0, 0)),
        expectedDuration: 15,
        location: AppointmentLocation.OPD,
        status: AppointmentStatus.SCHEDULED,
        statusHistory: [],
        urgency: UrgencyLevel.ROUTINE,
        preparation: {
            types: [],
            instructions: ['พักผ่อนให้เพียงพอ'],
        },
        remindersSent: false,
        symptoms: [],
        payment: {
            totalAmount: 1000,
            patientResponsibility: 0,
            insuranceCoverage: 1000,
            netAmount: 1000,
            paidAmount: 1000,
            balance: 0,
            paymentStatus: PaymentStatus.INSURANCE,
        },
        followUp: {
            isRequired: true,
            reason: 'ดูอาการหลังฉีด',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        __v: 0,
    },
];
