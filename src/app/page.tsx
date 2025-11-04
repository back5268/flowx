import Header from '@/components/header'
import FeaturesSection from '@/module/features'
import HeroSection from '@/module/hero'
import HowItWorksSection from '@/module/howitworks'
import TemplatesSection from '@/module/templates'

const page = () => {
  return (
    <div className='min-h-screen bg-background text-foreground'>
        <Header />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TemplatesSection />
    </div>
  )
}

export default page
