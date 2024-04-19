import { object, string, date, boolean } from 'yup';

export const UserSchema = (requirePass: boolean) =>
    object({
        first_name: string().required().min(3).max(255),
        last_name: string().required().min(3).max(255),
        username: string().required().min(3).max(255),
        email: string().required().email(),
        birthday: date(),
        mobile: string().nullable(),
        password: requirePass
            ? string()
                  .required()
                  .min(8)
                  .max(30)
                  .matches(
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]/,
                      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one symbol'
                  )
            : string().nullable(),
        is_admin: boolean().required(),
    });
