

import type { Diagnose } from "@/types/users";

export const DISEASES = [
"Normal",
"Cataract",
"Diabetes",
"Glaucoma",
"Hypertension",
"Pathological Myopia",
"Age Issues",
"Other Disorders",
"Diabetic Retinopathy",
] as const;

export type Disease = (typeof DISEASES)[number];

type DiseaseProbabilities = Record<Disease, number>;

type AIScenario = {
left: DiseaseProbabilities;
right: DiseaseProbabilities;
};

const AI_SCENARIOS: AIScenario[] = [
// Normal
{
    left: {
    Normal: 0.91,
    Cataract: 0.01,
    Diabetes: 0.01,
    Glaucoma: 0.02,
    Hypertension: 0.01,
    "Pathological Myopia": 0.01,
    "Age Issues": 0.01,
    "Other Disorders": 0.01,
    "Diabetic Retinopathy": 0.01,
    },

    right: {
    Normal: 0.88,
    Cataract: 0.02,
    Diabetes: 0.01,
    Glaucoma: 0.02,
    Hypertension: 0.01,
    "Pathological Myopia": 0.01,
    "Age Issues": 0.02,
    "Other Disorders": 0.01,
    "Diabetic Retinopathy": 0.02,
    },
},

// Diabetic Retinopathy
{
    left: {
    Normal: 0.04,
    Cataract: 0.03,
    Diabetes: 0.06,
    Glaucoma: 0.02,
    Hypertension: 0.04,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.02,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.74,
    },

    right: {
    Normal: 0.06,
    Cataract: 0.03,
    Diabetes: 0.07,
    Glaucoma: 0.02,
    Hypertension: 0.04,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.02,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.71,
    },
},

// Glaucoma
{
    left: {
    Normal: 0.08,
    Cataract: 0.03,
    Diabetes: 0.02,
    Glaucoma: 0.76,
    Hypertension: 0.02,
    "Pathological Myopia": 0.03,
    "Age Issues": 0.02,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.02,
    },

    right: {
    Normal: 0.10,
    Cataract: 0.03,
    Diabetes: 0.02,
    Glaucoma: 0.71,
    Hypertension: 0.03,
    "Pathological Myopia": 0.03,
    "Age Issues": 0.02,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.03,
    },
},

// Cataract
{
    left: {
    Normal: 0.07,
    Cataract: 0.78,
    Diabetes: 0.03,
    Glaucoma: 0.02,
    Hypertension: 0.02,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.03,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.01,
    },

    right: {
    Normal: 0.09,
    Cataract: 0.73,
    Diabetes: 0.03,
    Glaucoma: 0.02,
    Hypertension: 0.02,
    "Pathological Myopia": 0.03,
    "Age Issues": 0.04,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.02,
    },
},

// Hypertension
{
    left: {
    Normal: 0.10,
    Cataract: 0.02,
    Diabetes: 0.03,
    Glaucoma: 0.03,
    Hypertension: 0.73,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.02,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.02,
    },

    right: {
    Normal: 0.12,
    Cataract: 0.02,
    Diabetes: 0.03,
    Glaucoma: 0.03,
    Hypertension: 0.69,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.03,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.03,
    },
},

// Pathological Myopia
{
    left: {
    Normal: 0.08,
    Cataract: 0.02,
    Diabetes: 0.02,
    Glaucoma: 0.04,
    Hypertension: 0.02,
    "Pathological Myopia": 0.75,
    "Age Issues": 0.02,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.02,
    },

    right: {
    Normal: 0.10,
    Cataract: 0.02,
    Diabetes: 0.02,
    Glaucoma: 0.04,
    Hypertension: 0.02,
    "Pathological Myopia": 0.71,
    "Age Issues": 0.03,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.03,
    },
},

// Age Issues
{
    left: {
    Normal: 0.10,
    Cataract: 0.08,
    Diabetes: 0.02,
    Glaucoma: 0.04,
    Hypertension: 0.02,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.68,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.02,
    },

    right: {
    Normal: 0.12,
    Cataract: 0.07,
    Diabetes: 0.02,
    Glaucoma: 0.04,
    Hypertension: 0.02,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.67,
    "Other Disorders": 0.03,
    "Diabetic Retinopathy": 0.03,
    },
},

// Diabetes
{
    left: {
    Normal: 0.10,
    Cataract: 0.03,
    Diabetes: 0.70,
    Glaucoma: 0.03,
    Hypertension: 0.04,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.02,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.04,
    },

    right: {
    Normal: 0.12,
    Cataract: 0.03,
    Diabetes: 0.67,
    Glaucoma: 0.03,
    Hypertension: 0.04,
    "Pathological Myopia": 0.02,
    "Age Issues": 0.02,
    "Other Disorders": 0.02,
    "Diabetic Retinopathy": 0.05,
    },
},

// Other Disorders
{
    left: {
    Normal: 0.12,
    Cataract: 0.04,
    Diabetes: 0.03,
    Glaucoma: 0.03,
    Hypertension: 0.02,
    "Pathological Myopia": 0.03,
    "Age Issues": 0.03,
    "Other Disorders": 0.67,
    "Diabetic Retinopathy": 0.03,
    },

    right: {
    Normal: 0.14,
    Cataract: 0.04,
    Diabetes: 0.03,
    Glaucoma: 0.03,
    Hypertension: 0.02,
    "Pathological Myopia": 0.03,
    "Age Issues": 0.03,
    "Other Disorders": 0.65,
    "Diabetic Retinopathy": 0.03,
    },
},
];


function getMostProbableDisease(
probabilities: DiseaseProbabilities
): Disease {
return Object.entries(probabilities).reduce(
    (highest, current) =>
    current[1] > highest[1] ? current : highest
)[0] as Disease;
}

export function generateMockDiagnosis({
patientId,
appointment,
patientAge,
patientGender,
leftImage,
rightImage,
}: {
patientId: string;
appointment: string | null;
patientAge: number;
patientGender: string;
leftImage: string | null;
rightImage: string | null;
}): Omit<Diagnose, "physician"> {
const scenario =
    AI_SCENARIOS[
    Math.floor(Math.random() * AI_SCENARIOS.length)
    ];

const startedAt = new Date();

const processingTime =
    1500 + Math.floor(Math.random() * 2000);

const finishedAt = new Date(
    startedAt.getTime() + processingTime
);

const leftDiagnosis = getMostProbableDisease(
    scenario.left
);

const rightDiagnosis = getMostProbableDisease(
    scenario.right
);

return {
    id: `diagnosis-${crypto.randomUUID()}`,

    left_fundus_image: leftImage,
    right_fundus_image: rightImage,

    status: "SUCCESS",

    result: {
    final_diagnosis: {
        left_eye: leftDiagnosis,
        right_eye: rightDiagnosis,
    },

    evidence_vector: {
        left_fundus_diagnose: scenario.left,
        right_fundus_diagnose: scenario.right,

        age: patientAge,
        gender: patientGender,
    },
    },

    error_message: null,

    medical_notes:
    "AI-assisted fundus image analysis completed successfully.",

    worker_id: `ai-worker-${Math.floor(
    Math.random() * 3 + 1
    )}`,

    started_at: startedAt.toISOString(),

    finished_at: finishedAt.toISOString(),

    created_at: startedAt.toISOString(),

    updated_at: finishedAt.toISOString(),

    patient: patientId,


    appointment,

    model_version: "FundusAI-Demo-v1.0",
    };
}