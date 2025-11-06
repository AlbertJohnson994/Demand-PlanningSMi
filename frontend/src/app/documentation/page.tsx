import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FileText,
  Code,
  Database,
  Server,
  Globe,
  Package,
  BarChart3,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { DownloadButton } from '@/components/download-button';

export default function DocumentationPage() {
  const documentationSections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Project Overview',
      description: 'Complete system documentation and architecture',
      items: [
        'System Architecture',
        'Technology Stack',
        'Business Purpose',
        'Key Features',
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Frontend Documentation',
      description: 'Next.js frontend implementation details',
      items: [
        'Component Architecture',
        'State Management',
        'API Integration',
        'Styling System',
      ],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: 'Backend Documentation',
      description: 'NestJS backend API and services',
      items: [
        'API Endpoints',
        'Database Schema',
        'Business Logic',
        'Validation Rules',
      ],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Database Schema',
      description: 'SQLite database structure and relationships',
      items: ['Table Definitions', 'Data Types', 'Indexes', 'Migrations'],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'API Documentation',
      description: 'REST API endpoints and usage',
      items: [
        'Endpoint Reference',
        'Request/Response Formats',
        'Error Handling',
        'Authentication',
      ],
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: 'Docker Configuration',
      description: 'Containerization and deployment',
      items: [
        'Dockerfile Setup',
        'Docker Compose',
        'Environment Configuration',
        'Production Deployment',
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics & Monitoring',
      description: 'Production tracking and performance metrics',
      items: [
        'Growth Analysis',
        'Completion Rates',
        'Performance Metrics',
        'Monitoring Setup',
      ],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Development Guide',
      description: 'Setup and development workflow',
      items: [
        'Local Development',
        'Testing Strategy',
        'Code Quality',
        'Troubleshooting',
      ],
    },
  ];

  const quickLinks = [
    {
      title: 'Getting Started',
      description: 'Quick setup guide for new developers',
      href: '#getting-started',
    },
    {
      title: 'API Reference',
      description: 'Complete API endpoint documentation',
      href: '#api-reference',
    },
    {
      title: 'Deployment Guide',
      description: 'Production deployment instructions',
      href: '#deployment',
    },
    {
      title: 'Troubleshooting',
      description: 'Common issues and solutions',
      href: '#troubleshooting',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Project Documentation
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Complete technical documentation for the Demand Planning System -
            from backend to frontend, Docker configuration, and deployment
            guidelines.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documentationSections.map((section, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center space-x-3">
                  <div className="text-orange-500">{section.icon}</div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
            <CardDescription>
              Modern technology stack powering the Demand Planning System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Frontend</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui Components</li>
                  <li>• React Hook Form + Zod</li>
                  <li>• Recharts</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Backend</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• NestJS Framework</li>
                  <li>• TypeScript</li>
                  <li>• TypeORM</li>
                  <li>• SQLite Database</li>
                  <li>• class-validator</li>
                  <li>• CORS Enabled</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Infrastructure
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Docker & Docker Compose</li>
                  <li>• Node.js 18 Alpine</li>
                  <li>• Multi-stage Builds</li>
                  <li>• Health Checks</li>
                  <li>• Environment Config</li>
                  <li>• Network Isolation</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time Analytics</li>
                  <li>• Responsive Design</li>
                  <li>• CRUD Operations</li>
                  <li>• Data Validation</li>
                  <li>• Progress Tracking</li>
                  <li>• Status Workflow</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 rounded-lg border border-orange-200 bg-orange-50 p-8 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-orange-500" />
          <h3 className="mb-2 text-2xl font-bold text-gray-900">Need Help?</h3>
          <p className="mb-4 text-gray-600">
            Contact our development team for technical support or questions
            about implementation.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="mailto:contact@latinhasllc.com"
              className="rounded-md bg-orange-500 px-6 py-2 text-white transition-colors hover:bg-orange-600"
            >
              Contact Support
            </Link>
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>
  );
}
