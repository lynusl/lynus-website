export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen p-6 md:overflow-y-auto md:p-12 outline">{children}</div>
    );
  }