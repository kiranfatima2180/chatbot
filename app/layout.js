import "./globals.css";

export const metadata = {
  title: "Grok AI Chatbot",
  description: "Grok-powered AI chatbot"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}