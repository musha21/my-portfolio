import './globals.css';

export const metadata = {
  title: 'Mohammad Musharraf | Full-Stack Software Engineer & AI Engineer',
  description:
    'Full-Stack Software Engineer and AI Engineer building modern web applications, AI-powered solutions, and scalable digital products.',
  openGraph: {
    title: 'Mohammad Musharraf | Full-Stack Software Engineer & AI Engineer',
    description:
      'Building Digital Products That Solve Real-World Problems. Full-stack engineering, AI solutions, and creative design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Musharraf | Full-Stack Software Engineer & AI Engineer',
    description:
      'Building Digital Products That Solve Real-World Problems. Full-stack engineering, AI solutions, and creative design.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen overflow-x-hidden bg-black tracking-[-0.02em] text-white antialiased selection:bg-red-900 selection:text-white"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {children}
      </body>
    </html>
  );
}
