import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-6">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          From{' '}
          <span className="font-semibold text-foreground">Matrix Studio</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
