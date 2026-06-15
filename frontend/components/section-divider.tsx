'use client';

import { cn } from '@/lib/utils';

type SectionDividerProps = {
  from?: string;
  to?: string;
  accent?: boolean;
};

export function SectionDivider({
  from = 'bg-zinc-950',
  to = 'text-zinc-900',
  accent = false,
}: SectionDividerProps) {
  return (
    <div className={cn('relative h-14 overflow-hidden md:h-20', from)} aria-hidden="true">
      <svg
        className={cn('absolute inset-x-0 bottom-0 h-full w-full drop-shadow-[0_-10px_24px_rgba(124,58,237,0.12)]', to)}
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 44C22 44 22 28 44 28C66 28 66 44 88 44C110 44 110 28 132 28C154 28 154 44 176 44C198 44 198 28 220 28C242 28 242 44 264 44C286 44 286 28 308 28C330 28 330 44 352 44C374 44 374 28 396 28C418 28 418 44 440 44C462 44 462 28 484 28C506 28 506 44 528 44C550 44 550 28 572 28C594 28 594 44 616 44C638 44 638 28 660 28C682 28 682 44 704 44C726 44 726 28 748 28C770 28 770 44 792 44C814 44 814 28 836 28C858 28 858 44 880 44C902 44 902 28 924 28C946 28 946 44 968 44C990 44 990 28 1012 28C1034 28 1034 44 1056 44C1078 44 1078 28 1100 28C1122 28 1122 44 1144 44C1166 44 1166 28 1188 28C1210 28 1210 44 1232 44C1254 44 1254 28 1276 28C1298 28 1298 44 1320 44C1342 44 1342 28 1364 28C1386 28 1386 44 1408 44C1424 44 1432 36 1440 32V96H0V44Z"
        />
      </svg>

      {accent && (
        <div className="absolute bottom-0 left-1/2 h-9 w-24 -translate-x-1/2 text-amber-500/70 dark:text-violet-500/70">
          <div className="absolute left-1/2 top-0 h-9 w-3 -translate-x-1/2 rounded-b-full bg-current shadow-[0_0_22px_rgba(217,119,6,0.28)] dark:shadow-[0_0_22px_rgba(139,92,246,0.32)]" />
          <div className="absolute left-[31%] top-1 h-5 w-2 rounded-b-full bg-current opacity-70" />
          <div className="absolute right-[31%] top-1 h-5 w-2 rounded-b-full bg-current opacity-70" />
        </div>
      )}
    </div>
  );
}
