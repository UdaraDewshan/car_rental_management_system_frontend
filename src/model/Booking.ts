import type { Car } from "./Car";

export interface UserBasicInfo {
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
}

export interface Booking {
    bookingId: string;
    startDate: string; 
    endDate: string;
    withDriver: boolean;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
    carId: Car; 
    userId: UserBasicInfo;
}