import { Card } from "@/components/ui/card";
import { BarChart3, PlayCircle, Webhook, Workflow } from "lucide-react";

const steps = [
    {
        icon: Webhook,
        title: "Trigger",
        description: "Start workflows from webhooks, schedules, forms, or any event",
        details: ["Webhooks", "Cron Jobs", "Stripe Events", "Gmail", "HTTP Requests"],
    },
    {
        icon: Workflow,
        title: "Build Workflow",
        description: "Drag-and-drop visual editor with 200+ integrations",
        details: ["Visual Editor", "AI Nodes", "Code Blocks", "Conditions", "Loops"],
    },
    {
        icon: PlayCircle,
        title: "Run & Monitor",
        description: "Excute workflows with real-time logs and error handling",
        details: ["Live Excution", "Error Retry", "Debug Logs", "Performance"],
    },
    {
        icon: BarChart3,
        title: "Scale & Optimize",
        description: "Monitor performance and scale workflows automatically",
        details: [
            "Analytics",
            "Auto-Scale",
            "Load Balancing",
            "Team Collaboration",
            "API Access",
        ],
    },
];

const HowItWorksSection = () => {
    return <section className="py-24 px-6 bg-gradient-card from-background to-secondary/20">
        <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
                    How It Work
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Build powerful automation workflows in minutes, not hours. No code required.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
                return <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <Card className="relative p-8 h-full bg-gradient-card border-primary/20 backdrop-blur-sm hover:shadow-glow-primary transition-all duration-300 group">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-sm text-primary font-semibold mb-2">
                                Step {index + 1}
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground mb-4">{step.description}</p>
                        </div>

                        <div className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-glow-pulse" />
                                    <span className="text-sm text-muted-foreground">{detail}</span>
                                </div>
                            ))}
                        </div>

                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-card from-primary/50 to-transparent"></div>
                        )}
                    </Card>
                </div>
            })}
        </div>
    </section>;
};

export default HowItWorksSection;
