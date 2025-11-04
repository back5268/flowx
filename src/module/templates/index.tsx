import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    Bot,
    CreditCard,
    Database,
    FileText,
    Mail,
    Webhook,
} from "lucide-react";

const templates = [
    {
        icon: CreditCard,
        title: "Stripe -> Notion CRM",
        description: "Automatically creat customer records in Notion when Stripe",
        tags: ["E-commerce", "CRM", "Popular"],
        color: "border-neon-green/30 hover:border-neon-green/50",
    },
    {
        icon: FileText,
        title: "Google Form -> Sheets -> Slack",
        description: "Process form submissions and notify your team with formatted",
        tags: ["Forms", "Team", "Notifications"],
        color: "border-neon-blue/30 hover:border-neon-blue/50",
    },
    {
        icon: Mail,
        title: "Gmail -> AI Summarize -> Discord",
        description:
            "Summarize important emails with AI and send alerts to Discord or Channel",
        tags: ["AI", "Email", "Communication"],
        color: "border-neon-purple/30 hover:border-neon-purple/50",
    },
    {
        icon: Webhook,
        title: "Webhook -> HTTP -> Email",
        description: "Tranform webhook data and send customized email notification",
        tags: ["Webhooks", "API", "Email"],
        color: "border-neon-cyan/30 hover:border-neon-cyan/50",
    },
    {
        icon: Database,
        title: "CSV Import -> Validation -> Email",
        description:
            "Import and validate CSV data before syncing to your CRM system",
        tags: ["Data", "Validation", "CRM"],
        color: "border-neon-green/30 hover:border-neon-green/50",
    },
    {
        icon: Bot,
        title: "Social Media Monitor",
        description: "Track brand mentions across platforms and get AI-powered",
        tags: ["Social", "AI", "Monitoring"],
        color: "border-neon-blue/30 hover:border-neon-blue/50",
    },
];

const TemplatesSection = () => {
    return (
        <section id="templates" className="py-24 px-6">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
                        Start from Templates
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Launch your automation journey with battle-tested templates.
                        One-click setup, instant results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <Card
                                className={`p-6 h-full bg-gradient-card border-2 ${template.color} backdrop-blur-sm hover:shadow-glass transition-all duration-300 group cursor-pointer`}
                            >
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mb-4">
                                        <template.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
                                        {template.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        {template.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.map((tag, tagIndex) => (
                                        <Badge
                                            key={tagIndex}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Ready to use
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="text-center animate-fade-in">
                    <div className="bg-gradient-card p-8 rounded-2xl border border-primary/20 backdrop-blur-sm mx-auto max-w-2xl">
                        <h3 className="text-2xl font-bold mb-4">200+ More Templates</h3>
                        <p className="text-muted-foreground mb-6">
                            Explore our complete library of workflow templates for every use case imaginable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TemplatesSection;
