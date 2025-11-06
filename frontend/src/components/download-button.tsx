'use client';

import { Download } from 'lucide-react';

export function DownloadButton() {
  const handleDownloadPDF = () => {
    const content = `
Demand Planning System - Latinhas LLC
Comprehensive Technical Documentation
=====================================

PROJECT OVERVIEW:
-----------------
The Demand Planning System is a full-stack web application designed to streamline 
production planning and demand management for Latinhas LLC.

Key Features:
- Demand Management (CRUD operations)
- Production Tracking and Analytics
- Status Workflow Management
- Real-time Data Visualization
- Responsive Design

TECHNOLOGY STACK:
-----------------
Frontend:
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui components
- React Hook Form + Zod for validation
- Recharts for data visualization

Backend:
- NestJS framework
- TypeScript
- TypeORM for database management
- SQLite database
- class-validator for input validation

Infrastructure:
- Docker and Docker Compose
- Node.js 18 Alpine
- Multi-container architecture
- Health checks and monitoring

API ENDPOINTS:
--------------
GET    /api/demands          - Get all demands
GET    /api/demands/:id      - Get specific demand
POST   /api/demands          - Create new demand
PUT    /api/demands/:id      - Update demand
DELETE /api/demands/:id      - Delete demand
GET    /api/demands/statistics - Get analytics data

DEVELOPMENT SETUP:
------------------
1. Clone the repository
2. Run: docker-compose up --build
3. Access frontend: http://localhost:3000
4. Access backend API: http://localhost:3001/api

SUPPORT:
--------
For technical support or questions:
Email: contact@latinhasllc.com
Documentation: /documentation

This is a simplified version. Full documentation is available at the documentation page.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demand-planning-system-documentation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="flex items-center space-x-2 rounded-md bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-900"
    >
      <Download className="h-4 w-4" />
      <span>Download Full Documentation</span>
    </button>
  );
}
