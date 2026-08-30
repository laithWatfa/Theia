# Theia — Ophthalmology Management Dashboard

A responsive ophthalmology management platform built with
Next.js, TypeScript and Tailwind CSS.

## Features

- Authentication
- Patient management
- Appointment management
- Treatment plans
- Billing
- Fundus image diagnosis workflow
- AI diagnosis result visualization
- Arabic / English localization
- Responsive dashboard

## AI Diagnosis

The original application communicates with a Django backend
containing the AI inference service.

For this portfolio deployment, the backend was recreated
using Next.js API routes with synthetic data and a simulated
AI inference workflow.

The mock API preserves the frontend's original API contract,
including:

- Diagnosis status
- Evidence vectors
- Disease probabilities
- Most probable diagnosis
- Model version
- Processing timestamps

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- REST API
- i18n
