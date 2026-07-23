import type { ModelNode } from "../types/s223";

interface BreadcrumbProps {
  path: ModelNode[];
  onNavigate: (uri: string | null) => void; // null = top level
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      <button className="breadcrumb__item" onClick={() => onNavigate(null)}>
        Root
      </button>
      {path.map((n) => (
        <span key={n.uri}>
          <span className="breadcrumb__sep">/</span>
          <button className="breadcrumb__item" onClick={() => onNavigate(n.uri)}>
            {n.label}
          </button>
        </span>
      ))}
    </div>
  );
}
