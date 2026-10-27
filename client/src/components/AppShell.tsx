import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

const AppShell = ({ title, description, actions, children }: AppShellProps) => (
  <main className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-10">
    <header className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Address Book
            </Link>
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions}
      </div>
    </header>
    {children}
  </main>
);

export default AppShell;
