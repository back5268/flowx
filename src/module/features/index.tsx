import { Card } from "@/components/ui/card"
import { Activity, BookOpen, Brain, CreditCard, Globe, Puzzle, Shield, Zap } from "lucide-react"

const features = [
    { icon: Brain, title: "AI Nodes", description: "Integrate OpenAI, Claude, Gemini, and more AI models directly into your workflows", color: "text-neon-purple" },
    { icon: Puzzle, title: "200+ Integrations", description: "Connect Slack, Notion, Google Sheets, Stripe, Discord, and hundreds more services", color: "text-neon-blue" },
    { icon: Shield, title: "Secure Credential Vault", description: "Enterprise-grade security for API keys and sensitive data with encryption", color: "text-neon-green" },
    { icon: Activity, title: "Live Logs & Monitoring", description: "Real-time excution logs, error tracking, and performance monitoring", color: "text-neon-cyan" },
    { icon: BookOpen, title: "Templates Library", description: "Start fast with pre-build workflows for common automation monitoring", color: "text-neon-pulse" },
    { icon: CreditCard, title: "Flexible Billing", description: "Pay with Stripe or crypto through Cryptomus. Scale as you grow", color: "text-neon-blue" },
    { icon: Zap, title: "High Performance", description: "Lightning-fast execution with automatic scaling and error recovery", color: "text-neon-green" },
    { icon: Globe, title: "Global Edge Network", description: "Run workflows closer to your users with our worldwide infrastructure", color: "text-neon-cyan" },
]

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 px-6 bg-gradient-card from-secondary/20 to-background">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                        Everything You Need to Automate
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Powerful features designed for developers and teams who want to build sophisticated automation workflows.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <Card className="p-6 h-full bg-gradient-card border-primary/10">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-secondary/50 rounded-xl flex">
                                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 bg-secondary/30 py-3 px-6 rounded-full border border-primary/20">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <span className="text-sm">
                            <span className="text-muted-foreground">Payments powered by</span>
                            <span className="font-semibold text-foreground ml-1">Stripe</span>
                            <span className="text-muted-foreground mx-2">+</span>
                            <span className="font-semibold text-foreground">Cryptomus</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection
