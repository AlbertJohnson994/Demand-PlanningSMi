import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import { FooterDownloadButton } from './footer-download-button';
import { FooterGithubButton } from './footer-github-button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-orange-500 bg-black-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-500">Latinhas LLC</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Streamlining production planning and demand management with
              innovative solutions for the manufacturing industry.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Belo Horizonte, Brazil</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-300">
                  +55 (31) 97505-7303
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-300">
                  albert.johnson994@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">
              Quick Links
            </h4>
            <div className="space-y-2">
              <Link
                href="#"
                className="flex items-center space-x-1 text-sm text-gray-300 transition-colors hover:text-orange-500"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Company Website</span>
              </Link>
              <Link
                href="https://github.com/AlbertJohnson994"
                className="flex items-center space-x-1 text-sm text-gray-300 transition-colors hover:text-orange-500"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Support Center</span>
              </Link>
              <FooterGithubButton />
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">
              Documentation
            </h4>
            <div className="space-y-2">
              <Link
                href="/documentation"
                className="flex items-center space-x-1 text-sm text-gray-300 transition-colors hover:text-orange-500"
              >
                <FileText className="h-3 w-3" />
                <span>Project Documentation</span>
              </Link>
              <FooterDownloadButton />
              <Link
                href="/api-docs"
                className="flex items-center space-x-1 text-sm text-gray-300 transition-colors hover:text-orange-500"
              >
                <FileText className="h-3 w-3" />
                <span>API Reference</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Latinhas LLC. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link
                href="#"
                className="transition-colors hover:text-orange-500"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-orange-500"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="transition-colors hover:text-orange-500"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
