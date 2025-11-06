'use client';

import { Github } from 'lucide-react';

export function FooterGithubButton() {
  const handleGithubClick = () => {
    window.open('https://github.com/AlbertJohnson994', '_blank');
  };

  return (
    <button
      onClick={handleGithubClick}
      className="flex w-full items-center space-x-1 text-left text-sm text-gray-300 transition-colors hover:text-orange-500"
    >
      <Github className="h-3 w-3" />
      <span>GitHub Repository</span>
    </button>
  );
}
