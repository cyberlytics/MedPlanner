

export interface AppointmentMock {
    id: string;
    date: number;
    title: string;
    medic_name: string;
}


// from appointments-list2.json
export interface AppointmentMock2 {
    id: number;
    title: string;
    datetime: string;
    priority: string;
    medic_name: string;
    note: string;
}


export interface DoctorMock{
    id: number;
    first_name: string;
    surname: string;
    specialization: string;
}
