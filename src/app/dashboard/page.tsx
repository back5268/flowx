"use client"

import KpiCard from "@/components/kpi-card"
import RunTable from "@/components/run-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const page = () => {
    const handleUpgrade = () => {

    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
                <p className="text-gray-400">
                    Monitor your animation workflows and system performance
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Active Workflows" value={10} subtitle="Running automations" />
                <KpiCard title="Runs (30d)" value={5} subtitle="Total excutions" />
                <KpiCard title="Success Rate" value={4} progress={90} subtitle="Overall reliability" />
                <KpiCard title="Credits Left" value={100} progress={90} subtitle="Usage remaining" action={{
                    label: "Upgrade",
                    onClick: handleUpgrade
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-[#121826] border-[#1E293B]">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Runs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RunTable />
                        </CardContent>
                    </Card>
                </div>
                <RunTable />
            </div>
        </div>
    )
}

export default page
