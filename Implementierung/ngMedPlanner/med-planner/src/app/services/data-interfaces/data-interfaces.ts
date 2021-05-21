
export interface UserMock {
    email: string;
    password: string;
}

// from appointments-list.json
export interface AppointmentMock {
    id: number;
    title: string;
    datetime: string;
    doc_id: number;
    user_id: number;
    priority: string;
    note: string;
}


export interface DoctorMock {
    id: number;
    first_name: string;
    surname: string;
    specialization_id: number;
    surgery_id: number;
}


export interface SpecializationMock {
    id: number;
    description: string;
}


export interface SurgeryMock {
    id: number;
    city: string;
    address: string;
    description: string;
    telephone_num: string;
    website: string;
}
