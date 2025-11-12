import SideBar from "@/components/sidebar"
import TopBar from "@/components/topbar"

export const metadata = {
    title: "FlowX - Dashboard",
    description: "Flowx"
}

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex h-screen bg-[#0B0F14]">
        <SideBar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-auto bg-gradient-card from-[#0B0F14] to-[#E1320]">
                {children}
            </main>
        </div>
    </div>
}