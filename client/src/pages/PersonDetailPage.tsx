import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { fetchPerson } from "@/lib/api";
import type { Person } from "@/types/person";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; person: Person };

const PersonDetailPage = () => {
  const { id = "" } = useParams();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    void fetchPerson(id)
      .then((person) => {
        if (!cancelled) {
          setState({ status: "ready", person });
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
  }, [id]);

  if (state.status === "loading") {
    return (
      <AppShell title="Contact">
        <p className="text-sm text-muted-foreground">Loading contact…</p>
      </AppShell>
    );
  }

  if (state.status === "error") {
    return (
      <AppShell title="Contact">
        <div className="space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">{state.message}</p>
          <Button asChild variant="outline">
            <Link to="/">Back to contacts</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  const { person } = state;

  return (
    <AppShell
      title={`${person.firstName} ${person.lastName}`}
      description="Contact details"
    >
      <dl className="divide-y divide-border rounded-lg border border-border">
        <DetailRow label="First name" value={person.firstName} />
        <DetailRow label="Last name" value={person.lastName} />
        <DetailRow label="Phone" value={person.phone} />
        <DetailRow label="Email" value={person.email} />
        <DetailRow label="Address" value={person.address} />
      </dl>

      <Button asChild variant="outline">
        <Link to="/">Back to contacts</Link>
      </Button>
    </AppShell>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{trimmed}</dd>
    </div>
  );
};

export default PersonDetailPage;
