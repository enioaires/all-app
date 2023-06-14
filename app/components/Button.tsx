"use client";
import * as React from "react";
import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "../utils";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "relative disabled:opacity-70 rounded-lg hover:opacity-80 transition w-full",
  {
    variants: {
      variant: {
        default: "bg-emerald-500 border-emerald-500 text-white",
        outline: "bg-white border-black text-black hover:bg-gray-50",
        cancel: "bg-red-500 border-red-500 text-white",
        ghost:
          "bg-transparent border-transparent text-gray-400 hover:text-gray-600 hover:cursor-pointer",
      },
      size: {
        default: "py-2 text-md font-semibold border-2",
        sm: "py-1 text-sm font-light border-[1px]",
        mini: "w-fit h-8 px-3",
      },
      colorText: {
        default: "",
        red: "text-red-400 hover:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      colorText: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  Icon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, href, variant, size, colorText, Icon, ...props },
    ref
  ) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant, size, colorText, className })
          )}
        >
          {Icon && <Icon size={24} className="absolute left-4 top-3" />}
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, colorText, className }))}
        ref={ref}
        {...props}
      >
        {Icon && <Icon size={24} />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
