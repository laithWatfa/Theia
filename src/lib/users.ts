import { Bill } from "@/types/users";
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

export function getTreatments(){
  return api.get("/api/users/users/treatment-plans/").then((res => res.data))
}

export function getBills(){
  return api.get("/api/users/users/bills/").then((res => res.data))
}


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

export function newTreatment(data: {
        diagnosis: string,
        medication:string,
        instructions:string,
        dosage:string,
        surgical_interventions: string,
      }) {
  return api.post("/api/users/users/treatment-plans/", data).then((res) => res.data);
}


export function newBill(data: {
  appointment: string ,
  amount:string,
  is_paid:boolean,
}) {
  return api.post("/api/users/users/bills/", data).then((res) => res.data);
}


export function deletePatient(id: string) {
  return api.delete(`/api/users/users/patients/${id}/`).then((res) => res.data);

}

export function deleteDiagnosis(id: string) {
  return api.delete(`/api/diagnoses/${id}/`).then((res) => res.data);
}

export function deleteAppointment(id: string) {
  return api.delete(`/api/users/users/appointments/${id}`).then((res) => res.data);
}

export function deleteTreatment(id: string) {
  return api.delete(`/api/users/users/treatment-plans/${id}/`).then((res) => res.data);
}

export function deleteBill(id: string) {
  return api.delete(`/api/users/users/bills/${id}/`).then((res) => res.data);
}


export function updateBillStatus(bill : Bill) {
  return api.put(`/api/users/users/bills/${bill.id}/`, bill).then((res) => res.data);
}
