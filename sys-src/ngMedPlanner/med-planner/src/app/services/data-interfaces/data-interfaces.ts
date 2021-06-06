
export interface UserMock {
    email: string;
    password: string;
}

// from appointments-list.json
export interface AppointmentData {
    id: number;
    title: string;
    datetime: string;
    doc_id: number;
    user_id: number;
    priority: string;
    note: string;
    tags: Array<number> | undefined;
}

export interface TagData {
    id: number;
    description: string;
    color: string;
}


export interface DoctorData {
    id: number;
    first_name: string;
    surname: string;
    specialization_id: number;
    surgery_id: number;
}


export interface SpecializationData {
    id: number;
    description: string;
}


export interface SurgeryData {
    id: number;
    city: string;
    address: string;
    description: string;
    telephone_num: string;
    website: string;
}
