import Navbar      from '@/components/Navbar'
import Hero        from '@/components/Hero'
import Services    from '@/components/Services'
import NeedleDivider from '@/components/NeedleDivider'
import HowItWorks  from '@/components/HowItWorks'
import About       from '@/components/About'
import Reviews     from '@/components/Reviews'
import BookingForm from '@/components/BookingForm'
import StickyBar   from '@/components/StickyBar'
import Footer      from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <Services />
        <NeedleDivider />
        <HowItWorks />
        <About />
        <Reviews />
        <BookingForm />
      </main>

      <Footer />
      <StickyBar />
    </>
  )
}
