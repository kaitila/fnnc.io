import { Schema } from "@/kform/kschema/Schema";

export const signInWithPasswordSchema = new Schema({
    email: {
        type: 'email',
        required: true,
        maxLength: 40,
        message: 'Please enter a valid email address.'
    },
    password: {
        type: 'password',
        required: true,
        minLength: 6,
        maxLength: 20,
        message: 'Password has to be 6-20 characters long.',
    }
}, {});

export const signUpSchema = new Schema({
    email: {
        type: 'email',
        required: true,
        maxLength: 40,
        message: 'Please enter a valid email address.'
    },
    password: {
        type: 'password',
        required: true,
        minLength: 6,
        maxLength: 20,
        message: 'Password has to be 6-20 characters long.',
    },
    confirmPassword: {
        type: 'password',
        required: true,
        minLength: 6,
        maxLength: 20,
        message: 'Passwords do not match.',
        match: 'password',
    },
    firstName: {
        type: 'text',
        required: true,
        minLength: 1,
        maxLength: 20,
        message: 'First name is required',
    },
    lastName: {
        type: 'text',
        required: true,
        minLength: 1,
        maxLength: 20,
        message: 'Last name is required',
    }
}, {});