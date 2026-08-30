import type { Diagnose } from "@/types/users";

export const mockDiagnoses: Diagnose[] = [
{
    id: "diagnosis-001",
    left_fundus_image: "/images/LeftFundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "SUCCESS",

    result: {
    final_diagnosis: {
        "Diabetic Retinopathy": "Moderate",
        "Glaucoma": "Low probability",
        "Cataract": "Low probability",
    },

    evidence_vector: {
        left_fundus_diagnose: {
        "Diabetic Retinopathy": 0.82,
        Glaucoma: 0.12,
        Cataract: 0.18,
        "Normal": 0.06,
        },

        right_fundus_diagnose: {
        "Diabetic Retinopathy": 0.76,
        Glaucoma: 0.11,
        Cataract: 0.15,
        "Normal": 0.09,
        },

        age: 39,
        gender: "Male",
    },
    },

    error_message: null,
    medical_notes: "Signs of moderate diabetic retinal changes detected.",
    worker_id: "worker-001",
    started_at: "2026-08-03T09:05:00Z",
    finished_at: "2026-08-03T09:05:08Z",
    created_at: "2026-08-03T09:04:00Z",
    updated_at: "2026-08-03T09:05:08Z",
    patient: "patient-001",
    physician: 101,
    appointment: "appointment-001",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-002",
    left_fundus_image: "/images/fundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "SUCCESS",

    result: {
    final_diagnosis: {
        "Diabetic Retinopathy": "Low probability",
        "Glaucoma": "Low probability",
        "Cataract": "Normal",
    },

    evidence_vector: {
        left_fundus_diagnose: {
        "Diabetic Retinopathy": 0.08,
        Glaucoma: 0.09,
        Cataract: 0.12,
        Normal: 0.91,
        },

        right_fundus_diagnose: {
        "Diabetic Retinopathy": 0.06,
        Glaucoma: 0.07,
        Cataract: 0.10,
        Normal: 0.94,
        },

        age: 31,
        gender: "Female",
    },
    },

    error_message: null,
    medical_notes: "No significant pathological findings detected.",
    worker_id: "worker-002",
    started_at: "2026-08-04T10:35:00Z",
    finished_at: "2026-08-04T10:35:07Z",
    created_at: "2026-08-04T10:34:00Z",
    updated_at: "2026-08-04T10:35:07Z",
    patient: "patient-002",
    physician: 101,
    appointment: "appointment-002",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-003",
    left_fundus_image: "/images/fundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "SUCCESS",

    result: {
    final_diagnosis: {
        "Diabetic Retinopathy": "High probability",
        Glaucoma: "Moderate probability",
        Cataract: "Low probability",
    },

    evidence_vector: {
        left_fundus_diagnose: {
        "Diabetic Retinopathy": 0.91,
        Glaucoma: 0.51,
        Cataract: 0.21,
        Normal: 0.03,
        },

        right_fundus_diagnose: {
        "Diabetic Retinopathy": 0.88,
        Glaucoma: 0.47,
        Cataract: 0.18,
        Normal: 0.04,
        },

        age: 53,
        gender: "Male",
    },
    },

    error_message: null,
    medical_notes: "Significant diabetic retinal changes. Further clinical evaluation recommended.",
    worker_id: "worker-003",
    started_at: "2026-08-05T11:05:00Z",
    finished_at: "2026-08-05T11:05:11Z",
    created_at: "2026-08-05T11:04:00Z",
    updated_at: "2026-08-05T11:05:11Z",
    patient: "patient-003",
    physician: 102,
    appointment: "appointment-003",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-004",
    left_fundus_image: null,
    right_fundus_image: null,
    status: "FAILED",
    result: null,
    error_message: "Unable to process the uploaded fundus images.",
    medical_notes: "",
    worker_id: "worker-004",
    started_at: "2026-08-06T09:35:00Z",
    finished_at: "2026-08-06T09:35:04Z",
    created_at: "2026-08-06T09:34:00Z",
    updated_at: "2026-08-06T09:35:04Z",
    patient: "patient-004",
    physician: 102,
    appointment: "appointment-004",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-005",
    left_fundus_image: "/images/fundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "PENDING",
    result: null,
    error_message: null,
    medical_notes: "AI analysis is currently being processed.",
    worker_id: "worker-005",
    started_at: "2026-08-07T14:05:00Z",
    finished_at: "",
    created_at: "2026-08-07T14:04:00Z",
    updated_at: "2026-08-07T14:05:00Z",
    patient: "patient-005",
    physician: 103,
    appointment: "appointment-005",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-006",
    left_fundus_image: "/images/LeftFundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "SUCCESS",

    result: {
    final_diagnosis: {
        "Diabetic Retinopathy": "Low probability",
        Glaucoma: "High probability",
        Cataract: "Moderate probability",
    },

    evidence_vector: {
        left_fundus_diagnose: {
        "Diabetic Retinopathy": 0.08,
        Glaucoma: 0.89,
        Cataract: 0.62,
        Normal: 0.05,
        },

        right_fundus_diagnose: {
        "Diabetic Retinopathy": 0.06,
        Glaucoma: 0.84,
        Cataract: 0.58,
        Normal: 0.07,
        },

        age: 67,
        gender: "Male",
    },
    },

    error_message: null,
    medical_notes: "Findings are suggestive of glaucomatous changes.",
    worker_id: "worker-006",
    started_at: "2026-08-11T11:35:00Z",
    finished_at: "2026-08-11T11:35:10Z",
    created_at: "2026-08-11T11:34:00Z",
    updated_at: "2026-08-11T11:35:10Z",
    patient: "patient-007",
    physician: 101,
    appointment: "appointment-007",
    model_version: "fundus-ai-v2.4",
},

{
    id: "diagnosis-007",
    left_fundus_image: "/images/LeftFundusPlaceHolder.jpg",
    right_fundus_image: "/images/RightFundusPlaceHolder.jpg",
    status: "SUCCESS",

    result: {
    final_diagnosis: {
        "Diabetic Retinopathy": "Low probability",
        Glaucoma: "Low probability",
        Cataract: "High probability",
    },

    evidence_vector: {
        left_fundus_diagnose: {
        "Diabetic Retinopathy": 0.05,
        Glaucoma: 0.08,
        Cataract: 0.91,
        Normal: 0.03,
        },

        right_fundus_diagnose: {
        "Diabetic Retinopathy": 0.04,
        Glaucoma: 0.09,
        Cataract: 0.88,
        Normal: 0.04,
        },

        age: 46,
        gender: "Male",
    },
    },

    error_message: null,
    medical_notes: "Lens opacity findings are consistent with cataract.",
    worker_id: "worker-007",
    started_at: "2026-08-13T13:35:00Z",
    finished_at: "2026-08-13T13:35:09Z",
    created_at: "2026-08-13T13:34:00Z",
    updated_at: "2026-08-13T13:35:09Z",
    patient: "patient-009",
    physician: 103,
    appointment: "appointment-009",
    model_version: "fundus-ai-v2.4",
},
];