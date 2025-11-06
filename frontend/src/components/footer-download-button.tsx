'use client';

import { Download } from 'lucide-react';

export function FooterDownloadButton() {
  const handleDownloadPDF = () => {
    const content = `
Demand Planning System - Latinhas LLC
Comprehensive Technical Documentation

Project Overview:
- Full-stack production demand management system
- Real-time analytics and tracking
- Modern technology stack with Next.js and NestJS

Technology Stack:
Frontend: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
Backend: NestJS, TypeScript, TypeORM, SQLite
Containerization: Docker, Docker Compose

Access the full documentation at: /documentation
Contact: contact@latinhasllc.com
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demand-planning-documentation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="flex w-full items-center space-x-1 text-left text-sm text-gray-300 transition-colors hover:text-orange-500"
    >
      <Download className="h-3 w-3" />
      <span>Download PDF Guide</span>
    </button>
  );
}
