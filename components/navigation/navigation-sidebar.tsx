import {ModeToggle} from "@/components/mode-toggle";
import {Separator} from "@/components/ui/separator";
import NavigationAction from "@/components/navigation/navigation-action";
import {Car, Home} from "lucide-react";

const NavigationSidebar = () => {
    return (
        <div
            className="space-y-4 flex flex-col items-center
        h-full text-primary w-full py-3 dark:bg-[#1E1F22] bg-zinc-300/50"

        >
            <NavigationAction
                label="home"
                destination="/"
            >
                <Home className="group-hover:text-white transition text-emerald-500"
                     size={25}
                />
            </NavigationAction>

            <NavigationAction
            label="科目一练习"
            destination="/car/test1"
            >
                <Car className="group-hover:text-white transition text-emerald-500"
                    size={25}
                />
            </NavigationAction>

            <NavigationAction
                label="科目四练习"
                destination="/car/test4"
            >
                <Car className="group-hover:text-white transition text-emerald-500"
                     size={25}
                />
            </NavigationAction>

            <Separator
                className="h-[2px] bg-zinc-300 dark:bg-zinc-700
                rounded-md w-10 mx-auto"
            />
            <div className="flex-1 w-full"/>

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
            </div>

        </div>
    )
}

export default NavigationSidebar