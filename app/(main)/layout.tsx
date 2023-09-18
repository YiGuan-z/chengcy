import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="hidden md:flex h-full w-[84px] z-30
             flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[84px] h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout