import dotenv from 'dotenv'
dotenv.config();
// what does above line signify -> tells the dotenv library to: Read the .env file in your project root. -> Parse its contents (key-value pairs). ->Load those variables into process.env.

export type UserRole = 'standard' | 'lockedOut' | 'problem' | 'perfGlitch' | 'error' | 'visual' ;
// TypeAliases use PascalCase, and also Interfaces and Classes

interface UserCredentials {
    username: string;
    password: string;
}
// an interface in ts is used to define shape of the object -> what properties that object has and what types that properites must be.

const users: Record<UserRole, UserCredentials> = {
 standard: {
    username: process.env.STANDARD_USER!, // this '!' operator tells ts that this var is not undefined, so please make sure you have it configured in your .env
    password: process.env.STANDARD_PASSWORD!
 },
 lockedOut:{
    username: process.env.LOCKEDOUT_USER!,
    password: process.env.LOCKEDOUT_PASSWORD!
 },
 problem:{
    username: process.env.PROBLEM_USER!,
    password: process.env.PROBLEM_PASSWORD!
 },
 perfGlitch:{
    username: process.env.PERFGLITCH_USER!,
    password: process.env.PERFGLITCH_PASSWORD!
 },
 error:{
    username: process.env.ERROR_USER!,
    password: process.env.ERROR_PASSWORD!
 },
 visual:{
    username: process.env.VISUAL_USER!,
    password: process.env.VISUAL_PASSWORD!
 }

}

export function getUser(role: UserRole): UserCredentials {
    const user = users[role];
    if(!user || !user.username || !user.password) {
        throw new Error(`Missing Credentials for Role: ${role}`);
    }
    return user;
}