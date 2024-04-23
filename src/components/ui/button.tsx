import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 whitespace-normal",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 whitespace-normal",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground whitespace-normal",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 whitespace-normal",
        ghost: "hover:bg-accent hover:text-accent-foreground whitespace-normal",
        link: "text-primary underline-offset-4 hover:underline whitespace-normal",
      },
      size: {
        default: "h-auto px-4 py-2", // Changed height to auto to accommodate text size
        sm: "h-auto rounded-md px-3 py-1.5", // Adjusted padding and set height to auto
        lg: "h-auto rounded-md px-8 py-3", // More padding for larger buttons
        icon: "h-10 w-10", // Icon buttons typically don't need text wrapping
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
