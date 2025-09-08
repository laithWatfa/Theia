import { headers } from "next/headers";
import api from "./api";


export function getUserProfile() {
  return api.get("/api/users/profile/").then((res) => res.data);
}


export function getPatients(){
  return api.get("/api/users/users/patients/").then((res => {
    console.log(res)
    return res.data}))
}

export function getDiagnoses(){
  return api.get("/api/diagnoses/").then((res => res.data))
}

export function getAppointments(){
  return api.get("/api/users/users/appointments/").then((res => res.data))
}

// {
//   personal_photo: string | null;
//   full_name: string;
//   date_of_birth: string;
//   gender: string;
//   address: string;
//   phone: string;
//   insurance_info: string;
//   contact_info: string;
//   clinic_id: string;
// }

export function addNewPatient(data:FormData ) {
  return api.post("/api/users/users/patients/", data).then((res) => res.data);
}


export function newDiagnose(data : FormData){
  return api.post("/api/diagnoses/",data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}).then(res => {
  console.log(res.data)
  return res.data
})
}

export function newAppointment(data: {
  patient: string ,
  appointment_datetime:string,
  notes:string,
}) {
  return api.post("/api/users/users/appointments/", data).then((res) => res.data);
}


