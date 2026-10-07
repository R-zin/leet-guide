import type { Metadata } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LeetGuide - Ultimate Data Structures & Algorithms Guide',
  description:
    'A comprehensive, battle-tested DSA Guide featuring high-frequency LeetCode questions solved in Python, JavaScript, C++, and Java, interactive algorithm visualizers, in-browser code sandboxes, and Big-O cheat sheets.',
  keywords: [
    'DSA Guide',
    'LeetCode Solutions',
    'Algorithm Visualizers',
    'Data Structures and Algorithms',
    'Blind 75',
    'NeetCode',
    'Technical Interview Prep',
    'Python',
    'JavaScript',
    'C++',
    'Java'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <ProgressProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
