'use client';

import { ReactNode } from 'react';
import { ConvexProvider } from 'convex/react';
import { convex } from '@/lib/convex';

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}