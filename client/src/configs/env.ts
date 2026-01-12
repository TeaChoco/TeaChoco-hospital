//-Path: "TeaChoco-Hospital/client/src/configs/env.ts"
/**
 * วัตถุที่เก็บค่าคอนฟิกูเรชันจาก environment variables
 */
const env = {
    mode: import.meta.env.VITE_MODE,
    apiUrl: import.meta.env.VITE_API_URL,
    clientUrl: import.meta.env.VITE_CLIENT_URL,
    clientHost: import.meta.env.VITE_CLIENT_HOST,
    clientPort: import.meta.env.VITE_CLIENT_PORT,
    apiTokenKey: import.meta.env.VITE_API_TOKEN_KEY,
};

/**
 * ตรวจสอบว่า environment variables ที่จำเป็นถูกกำหนดไว้ครบถ้วนหรือไม่
 * @throws {Error} ถ้ามีตัวแปรที่จำเป็นขาดหายไป
 */
function validateEnv() {
    const required = Object.keys(env) as (keyof typeof env)[];
    const missing = required.filter((key) => !env[key]);
    if (missing.length > 0) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

// รันการตรวจสอบทันทีเมื่อไฟล์ถูกโหลด
validateEnv();

export default env;
