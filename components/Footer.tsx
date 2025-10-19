import React from 'react';

interface FooterProps {
  content: string;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="w-full mt-auto py-4 bg-transparent print:hidden">
      <div className="text-center text-[var(--text-secondary)] text-sm px-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </footer>
  );
};

export default Footer;
