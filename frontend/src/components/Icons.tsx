type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (className = "w-5 h-5") => ({
  className,
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const HeartIcon = ({ className, strokeWidth = 2, filled = false }: IconProps & { filled?: boolean }) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"} strokeWidth={strokeWidth}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const XIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const CheckIcon = ({ className, strokeWidth = 2.5 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const SunIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const MenuIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const UsersIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);

export const InboxIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z" />
  </svg>
);

export const UserIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const LayersIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </svg>
);

export const LogoutIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export const MailIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const LinkBrokenIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 3.5 8.5M3 3l18 18" />
  </svg>
);

export const SearchIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const AlertIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </svg>
);

export const ArrowLeftIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const RefreshIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export const FlameIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="dt-flame" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--dt-brand)" />
        <stop offset="100%" stopColor="var(--dt-brand-2)" />
      </linearGradient>
    </defs>
    <path
      d="M12 2c.6 3.2 2.4 4.6 4 6.3A8 8 0 1 1 5.4 9.6c.5 1.3 1.5 2 2.6 2.2-.4-3.6 1-7.4 4-9.8z"
      fill="url(#dt-flame)"
    />
  </svg>
);
