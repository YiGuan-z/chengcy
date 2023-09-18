import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const font = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'cheng的个人小网页',
    description: '来点好康的🥰',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(
            font.className,
            "bg-[#f5f5f5]",
            "dark:bg-[#121212]"
        )}>
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={true}
                storageKey="chengcy.top"
            >
                {children}
            </ThemeProvider>
        </div>
        </body>
        </html>
    )
}
