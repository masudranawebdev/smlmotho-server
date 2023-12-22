import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  dafault_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  dafault_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  node_env: process.env.NODE_ENV,
  secret_key: process.env.SECRET_KEY,
  jwt: {
    access_secret: process.env.SECRET,
    access_expires: process.env.EXPIRES_IN,
    refesh_secret: process.env.REFESH_SECRET,
    refesh_expires: process.env.REFESH_EXPIRES_IN,
  },
};
