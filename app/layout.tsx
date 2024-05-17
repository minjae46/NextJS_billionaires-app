import "../styles/reset.css";
import "../styles/global.css";

export const metadata = {
  title: {
    template: "%s | BILLIONAIRES",
    default: "BILLIONAIRES",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
