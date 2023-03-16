import { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div
      className={clsx(
        "w-screen",
        "h-screen",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
      )}
    >
      <div className={clsx("text-3xl", "font-bold", "m-4")}>
        404 - Page Not Found
      </div>
      <div className={clsx("text-xl", "font-bold", "m-4")}>
        Redirecting to homepage...
      </div>
    </div>
  );
}
