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
    BEFORE = 'before',
    AFTER = 'after',
    WITH = 'with',
    EMPTY_STOMACH = 'empty_stomach',
}

export enum TimeUnit {
    MINUTES = 'minutes',
    HOURS = 'hours',
    DAYS = 'days',
}

export enum MedicineUnit {
    TABLET = 'tablet',
    CAPSULE = 'capsule',
    ML = 'ml',
    DROP = 'drop',
    PUMP = 'pump',
    PATCH = 'patch',
    INHALATION = 'inhalation',
    SUPPOSITORY = 'suppository',
    OINTMENT = 'ointment',
    INJECTION = 'injection',
    OTHER = 'other',
}

export enum MedicineType {
    TABLET = 'tablet',
    CAPSULE = 'capsule',
    SYRUP = 'syrup',
    INJECTION = 'injection',
    OINTMENT = 'ointment',
    DROPS = 'drops',
    INHALER = 'inhaler',
    SUPPOSITORY = 'suppository',
}

export enum StorageCondition {
    ROOM_TEMP = 'room_temp',
    REFRIGERATED = 'refrigerated',
    PROTECT_FROM_LIGHT = 'protect_from_light',
    PROTECT_FROM_MOISTURE = 'protect_from_moisture',
    FREEZER = 'freezer',
}

export enum SeverityLevel {
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

export enum EffectServeriry {
    MILD = 'mild',
    MODERATE = 'moderate',
    SEVERE = 'severe',
}

export enum EffectProbability {
    RARE = 'rare',
    UNCOMMON = 'uncommon',
    COMMON = 'common',
    VERY_COMMON = 'very_common',
}
