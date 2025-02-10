import {
  AnimatedButton,
  AnimatedElement,
  AnimatedForm,
  AnimatedInput,
  AnimatedSection,
  AnimatedServiceCard,
  AnimatedTextArea
} from '@/components/AnimatedSection';
import { ImageCarousel } from '@/components/ImageCarousel';
import { getAboutContent, getServices } from '@/utils/airtable';

export default async function Home() {
  const services = await getServices();
  const aboutContent = await getAboutContent();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <AnimatedSection className="relative h-screen flex items-center">
        <div className="absolute inset-0 -z-10" style={{ 
          background: `radial-gradient(60.57% 74.2% at 50% 0%, rgba(255, 182, 47, 0.80) 0%,  rgba(255, 255, 255, 1.00) 100%)`
        }}></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <AnimatedElement>
              <h1 className="mb-10">Srinidhi Narayana</h1>
            </AnimatedElement>
            <div className="flex flex-col gap-4">
              <AnimatedElement>
                <h3>Land Your Dream Job Faster</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p>Optimized Resume, LinkedIn, and Job Search Strategy</p>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16">Writing</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Resume Writing</h3>
                <p>Get a professionally written resume that highlights your achievements and skills</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Job Search Strategy</h3>
                <p>Learn effective strategies to navigate your job search and land interviews</p>
              </div>
            </AnimatedServiceCard>
          </div>
        </div>
      </AnimatedSection>
      {/* Linkedin Profile Optimisation Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16">Linkedin Profile Optimisation</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Resume Writing</h3>
                <p>Get a professionally written resume that highlights your achievements and skills</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Job Search Strategy</h3>
                <p>Learn effective strategies to navigate your job search and land interviews</p>
              </div>
            </AnimatedServiceCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Resume Writing Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16">Resume Writing</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Resume Writing</h3>
                <p>Get a professionally written resume that highlights your achievements and skills</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Job Search Strategy</h3>
                <p>Learn effective strategies to navigate your job search and land interviews</p>
              </div>
            </AnimatedServiceCard>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Customer Success Consulting */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16">Customer Success Consulting</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Resume Writing</h3>
                <p>Get a professionally written resume that highlights your achievements and skills</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Job Search Strategy</h3>
                <p>Learn effective strategies to navigate your job search and land interviews</p>
              </div>
            </AnimatedServiceCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Job search strategy and 1:1 coaching Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16">Job search strategy and 1:1 coaching</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Resume Writing</h3>
                <p>Get a professionally written resume that highlights your achievements and skills</p>
              </div>
            </AnimatedServiceCard>
            <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
              <div className="aspect-square w-full bg-gray-100"></div>
              <div className="p-8">
                <h3 className="mb-2">Job Search Strategy</h3>
                <p>Learn effective strategies to navigate your job search and land interviews</p>
              </div>
            </AnimatedServiceCard>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection className="bg-white py-16 px-4" isContainer>
        <div className="max-w-4xl mx-auto">
          <AnimatedElement className="text-3xl font-bold text-center mb-8">
            {aboutContent?.heading || 'About Us'}
          </AnimatedElement>
          {aboutContent?.description ? (
            aboutContent.description.map((paragraph, index) => (
              <AnimatedElement 
                key={index}
                className="text-gray-600 text-lg text-center mb-6 last:mb-0"
              >
                {paragraph}
              </AnimatedElement>
            ))
          ) : (
            <>
              <AnimatedElement className="text-gray-600 text-lg text-center mb-6">
                We are a team of passionate writers dedicated to delivering high-quality content that helps businesses grow and engage their audience.
              </AnimatedElement>
              <AnimatedElement className="text-gray-600 text-lg text-center">
                With years of experience across various industries, we understand what it takes to create content that resonates and delivers results.
              </AnimatedElement>
            </>
          )}
        </div>
      </AnimatedSection>

      {/* Why choose me? Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16 text-center">Why choose me?</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left side - Stacked cards */}
            <div className="flex flex-col gap-8">
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8">
                  <p>I know firsthand how tough the job search can be—I spent over six months navigating it myself, testing different strategies, and refining what truly works. Along the way, I've connected with professionals who have been searching for much longer without results. Through trial, insight, and persistence, I developed proven methods that landed me interview calls.</p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8">
                  <p>Beyond that, I've been actively building my personal brand on LinkedIn for over four years, sharing valuable insights, strategies, and lessons learned. Now, I help others do the same—so you don't have to go through the same struggle alone.</p>
                </div>
              </AnimatedElement>
            </div>
            
            {/* Right side - Image Carousel */}
            <AnimatedElement>
              <div className="h-[calc(100%+4rem)] -my-8 relative aspect-auto rounded-lg overflow-hidden">
                <ImageCarousel 
                  images={[
                    '/carousel-1.jpg',
                    '/carousel-2.jpg',
                    '/carousel-3.jpg',
                  ]} 
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* How it works? Section */}
      <AnimatedSection className="py-24 bg-white" isContainer>
        <div className="container">
          <AnimatedElement>
            <h2 className="mb-16 text-center">How it works?</h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <AnimatedElement>
              <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                <h3 className="text-yellow-500 font-semibold mb-4">Audit & Strategy</h3>
                <p className="mb-4">Analyze your current profile & goals</p>
                <p className="text-gray-500 text-sm">Via prioritized chats/calls</p>
              </div>
            </AnimatedElement>

            {/* Step 2 */}
            <AnimatedElement>
              <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                <h3 className="text-yellow-500 font-semibold mb-4">Optimization</h3>
                <p>Improve your profile & strategy</p>
              </div>
            </AnimatedElement>

            {/* Step 3 */}
            <AnimatedElement>
              <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                <h3 className="text-yellow-500 font-semibold mb-4">Results & Growth</h3>
                <p>Start attracting the right opportunities</p>
              </div>
            </AnimatedElement>

            {/* PS Note */}
            <AnimatedElement>
              <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                <p className="text-gray-600">PS: Timelines vary based on the service, and I'll share the expected timeframe upfront!</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement className="text-3xl font-bold text-center mb-8">
            Get in Touch
          </AnimatedElement>
          <AnimatedForm className="max-w-lg mx-auto">
            <AnimatedInput
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <AnimatedInput
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <AnimatedTextArea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <AnimatedButton
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </AnimatedButton>
          </AnimatedForm>
        </div>
      </AnimatedSection>
    </main>
  );
}
