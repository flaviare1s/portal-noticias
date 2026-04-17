"use client";

import { useEffect, useState } from "react";

const shouldEnableMocking = () =>
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ENABLE_MSW !== "false";

export default function MockServiceWorkerProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isReady, setIsReady] = useState(!shouldEnableMocking());

  useEffect(() => {
    if (!shouldEnableMocking()) {
      return;
    }

    let isMounted = true;

    const startWorker = async () => {
      const { worker } = await import("@/mocks/browser");

      await worker.start({
        onUnhandledRequest: "bypass",
      });

      if (isMounted) {
        setIsReady(true);
      }
    };

    void startWorker();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return children;
}
