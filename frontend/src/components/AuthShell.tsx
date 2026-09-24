import type { ReactNode } from "react";
import { Logo } from "./ui";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex justify-center w-full animate-fade-up">
      <div className={`w-full ${wide ? "max-w-lg" : "max-w-md"}`}>
        <div className="dt-card dt-card-lg p-7 sm:p-9">
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-fg">{title}</h1>
            {subtitle && <p className="text-sm text-muted mt-1.5">{subtitle}</p>}
          </div>

          {children}
        </div>

        {footer && <div className="text-center text-sm text-muted mt-6">{footer}</div>}
      </div>
    </div>
  );
}
