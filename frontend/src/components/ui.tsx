import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FlameIcon } from "./Icons";

export const Logo = ({ to, className = "" }: { to?: string; className?: string }) => {
  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <FlameIcon className="w-6 h-6 shrink-0" />
      <span className="text-lg font-black tracking-tight text-fg">
        DEV<span className="dt-gradient-text">TINDER</span>
      </span>
    </span>
  );
  return to ? (
    <Link to={to} className="shrink-0">
      {inner}
    </Link>
  ) : (
    inner
  );
};

const initialsOf = (name = "", last = "") =>
  ((name[0] || "") + (last[0] || "")).toUpperCase() || "?";

export const Avatar = ({
  src,
  firstName = "",
  lastName = "",
  className = "w-12 h-12",
  rounded = "rounded-full",
}: {
  src?: string;
  firstName?: string;
  lastName?: string;
  className?: string;
  rounded?: string;
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        className={`${className} ${rounded} shrink-0 grid place-items-center bg-brand-soft text-brand-soft-fg font-bold select-none border border-line`}
        aria-hidden="true"
      >
        {initialsOf(firstName, lastName)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${firstName} ${lastName}`.trim() || "avatar"}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} ${rounded} shrink-0 object-cover bg-surface-2 border border-line`}
    />
  );
};

export const CoverImage = ({
  src,
  firstName = "",
  alt,
  className = "w-full h-full",
}: {
  src?: string;
  firstName?: string;
  alt?: string;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        className={`${className} grid place-items-center bg-brand-soft text-brand-soft-fg text-6xl font-black select-none`}
        aria-hidden="true"
      >
        {(firstName[0] || "?").toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || firstName}
      draggable={false}
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
};

export const Spinner = ({ className = "w-5 h-5" }: { className?: string }) => (
  <span
    role="status"
    aria-label="Loading"
    className={`${className} inline-block rounded-full border-2 border-current border-t-transparent animate-spin`}
  />
);

export const PageLoader = ({ label = "Loading…" }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-24 text-brand">
    <Spinner className="w-9 h-9" />
    <p className="text-sm font-medium text-muted">{label}</p>
  </div>
);

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`dt-skeleton ${className}`} />
);

export const SkeletonRow = () => (
  <div className="dt-card p-4 flex items-center gap-4">
    <Skeleton className="w-16 h-16 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-1/4" />
      <div className="flex gap-1.5 pt-1">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  </div>
);

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  action?: ReactNode;
}) => (
  <div className="flex justify-center w-full animate-fade-up">
    <div className="dt-card dt-card-lg max-w-sm w-full p-10 text-center">
      <div className="mx-auto mb-5 w-16 h-16 grid place-items-center rounded-2xl bg-brand-soft text-brand-soft-fg">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-fg">{title}</h3>
      <p className="text-sm text-muted mt-2 leading-relaxed">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  </div>
);

export const PageHeader = ({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle?: string;
  count?: number;
}) => (
  <header className="mb-6">
    <div className="flex items-center gap-3">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-fg">{title}</h1>
      {count !== undefined && (
        <span className="text-xs font-bold text-brand-soft-fg bg-brand-soft border border-line px-2.5 py-1 rounded-full tabular-nums">
          {count}
        </span>
      )}
    </div>
    {subtitle && <p className="text-sm text-muted mt-1.5">{subtitle}</p>}
  </header>
);

export const SkillChips = ({ skills, max }: { skills?: string[]; max?: number }) => {
  if (!skills?.length) return null;
  const shown = max ? skills.slice(0, max) : skills;
  const rest = max ? skills.length - shown.length : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((skill, i) => (
        <span key={`${skill}-${i}`} className="dt-chip">
          {skill}
        </span>
      ))}
      {rest > 0 && <span className="dt-chip opacity-70">+{rest}</span>}
    </div>
  );
};
