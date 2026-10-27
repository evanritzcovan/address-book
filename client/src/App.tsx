import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchSeedPersons } from "@/lib/api";
import type { Person } from "@/types/person";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; persons: Person[] };

const App = () => {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  const load = () => {
    setState({ status: "loading" });
    void fetchSeedPersons()
      .then((persons) => setState({ status: "ready", persons }))
      .catch((error: unknown) =>
        setState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Unable to reach the API",
        }),
      );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Address Book</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Phase 1 scaffold
        </h1>
        <p className="text-muted-foreground">
          Domain logic and seed data live on the API. List and detail views
          arrive in later phases.
        </p>
      </header>

      {state.status === "loading" && (
        <p className="text-sm text-muted-foreground">Loading seed contacts…</p>
      )}

      {state.status === "error" && (
        <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">{state.message}</p>
          <Button type="button" variant="outline" onClick={load}>
            Retry
          </Button>
        </div>
      )}

      {state.status === "ready" && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-foreground">
            Seed contacts ({state.persons.length})
          </h2>
          {state.persons.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contacts in seed data.</p>
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {state.persons.map((person) => (
                <li
                  key={person.id}
                  className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-medium text-foreground">
                    {person.firstName} {person.lastName}
                  </span>
                  <span className="text-sm text-muted-foreground">{person.phone}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
};

export default App;
