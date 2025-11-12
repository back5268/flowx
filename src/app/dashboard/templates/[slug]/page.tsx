"use client"

import { Card, CardContent } from "@/components/ui/card";
import { reindexStepNumbers } from "@/components/workflows/flow-utils";
import { useUser } from "@/hooks/useUser"
import { mockTemplates } from "@/lib/mock";
import { useParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const Page = () => {
    const params = useParams()
    const slug = params.slug as string
    const { user } = useUser()

    const [selectedNode, setSelectedNode] = useState<Node | null>(null)
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const [template, setTemplate] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalNodeData, setModalNodeData] = useState<any>(null)
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

    const reactFlowWrapper = useRef<HTMLDivElement>(null)
    const handleNodesChange = useCallback((changes: any) => {
        onNodesChange(changes)
        setNodes(nds => reindexStepNumbers(nds, edges))
    }, [onNodesChange, setNodes, edges])

    const onDragStart = useCallback((event: React.DragEvent, nodeType: any) => {
        event.dataTransfer.setData(
            "application/reactflow",
            JSON.stringify(nodeType)
        )
        event.dataTransfer.effectAllowed === "move"
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        if (!reactFlowWrapper.current || !reactFlowInstance) return
        const bounds = reactFlowWrapper.current.getBoundingClientRect()
        const nodeData = JSON.parse(event.dataTransfer.getData("application/reactflow"))
    }, [])

    useEffect(() => {
        const foundTemplate = mockTemplates.find(m => m.id === slug)
        if (!foundTemplate) return
        setTemplate(foundTemplate)
    }, [slug])

    return (
        <div className="flex h-full">
            <div className="flex-1 p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Edit Template: {template?.name || slug}
                        </h1>
                        <p className="text-gray-400">
                            {template?.description || "Design your workflow by connecting nodes"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3"></div>
                </div>
                <Card className="bg-[#121826] border-[#1E293B] flex-1 relative">
                    <CardContent className="p-0 h-full">
                        <div ref={reactFlowWrapper} className="h-full w-full">
                            <ReactFlow nodes={nodes} edges={edges} onNodesChange={handleNodesChange}></ReactFlow>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Page
