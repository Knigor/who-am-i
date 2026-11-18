import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
                outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
