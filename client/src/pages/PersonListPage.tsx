import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { fetchPersons } from "@/lib/api";
import type { Person, SortBy } from "@/types/person";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; persons: Person[] };

const PersonListPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>("last");
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    void fetchPersons(sortBy)
      .then((persons) => {
        if (!cancelled) {
          setState({ status: "ready", persons });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to reach the API",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sortBy, reloadToken]);

  return (
    <AppShell
      title="Contacts"
      description="Select a person to view their details."
    >
      {state.status === "loading" && (
        <p className="text-sm text-muted-foreground">Loading contacts…</p>
      )}

      {state.status === "error" && (
        <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">{state.message}</p>
          <p className="text-sm text-muted-foreground">
            Start the API with{" "}
            <code className="text-foreground">npm run dev:server</code> (port
            43121), then retry.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setReloadToken((token) => token + 1)}
          >
            Retry
          </Button>
        </div>
      )}

      {state.status === "ready" && state.persons.length === 0 && (
        <p className="text-sm text-muted-foreground">No contacts yet.</p>
      )}

      {state.status === "ready" && state.persons.length > 0 && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-medium text-foreground">
              {state.persons.length}{" "}
              {state.persons.length === 1 ? "contact" : "contacts"}
            </h2>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="sort-by-first"
                className={
                  sortBy === "last"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                Last
              </Label>
              <Switch
                id="sort-by-first"
                checked={sortBy === "first"}
                onCheckedChange={(checked) =>
                  setSortBy(checked ? "first" : "last")
                }
                aria-label="Sort by first name"
              />
              <Label
                htmlFor="sort-by-first"
                className={
                  sortBy === "first"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              >
                First
              </Label>
            </div>
          </div>
          <ul className="divide-y divide-border rounded-lg border border-border">
            {state.persons.map((person) => (
              <li key={person.id}>
                <Link
                  to={`/persons/${person.id}`}
                  className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-medium text-foreground">
                    {person.firstName} {person.lastName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {person.phone}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
};

export default PersonListPage;
