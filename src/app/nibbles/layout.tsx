export default function NibblesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-16 pr-2 pl-2">{children}</div>;
}
