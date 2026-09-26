import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/layout/LanguageContext';
import { ConditionalSiteChrome } from '@/components/layout/ConditionalSiteChrome';

export const metadata: Metadata = {
  title: 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की | Vanprasthi Jan-Jagriti Abhiyan Samiti',
  description:
    'Registered non-political NGO (Reg. No. 052/2016-2017) in Roorkee, Uttarakhand dedicated to Swachhata drives, social education, anti-corruption awareness, and community service under President Col. M.P. Sharma (Retd.).',
  keywords: [
    'वानप्रस्थी जन-जागृति अभियान समिति',
    'Vanprasthi Jan-Jagriti Abhiyan Samiti',
    'Roorkee NGO',
    'Uttarakhand NGO',
    'cleanliness drive Roorkee',
    'social education Uttarakhand',
    'anti-corruption awareness NGO',
    'Col MP Sharma NGO',
  ],
  authors: [{ name: 'Vanprasthi Samiti Editorial' }],
  openGraph: {
    title: 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की',
    description: 'राष्ट्रहित सर्वोपरि — निस्वार्थ समाज सेवा',
    url: 'https://vanprasthisamiti.org',
    siteName: 'Vanprasthi Jan-Jagriti Abhiyan Samiti',
    locale: 'hi_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-saffron-500 selection:text-white">
        <LanguageProvider>
          <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
