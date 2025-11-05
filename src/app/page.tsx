import Header from '@/components/header'
import CTASection from '@/module/cta'
import FeaturesSection from '@/module/features'
import Footer from '@/module/footer'
import HeroSection from '@/module/hero'
import HowItWorksSection from '@/module/howitworks'
import PricingSection from '@/module/pricing'
import TemplatesSection from '@/module/templates'

const page = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
        <Header />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TemplatesSection />
        <PricingSection />
        <CTASection />
        <Footer />
    </div>
  )
}

export default page
