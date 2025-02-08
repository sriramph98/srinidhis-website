import {
  AnimatedButton,
  AnimatedElement,
  AnimatedForm,
  AnimatedInput,
  AnimatedSection,
  AnimatedServiceCard,
  AnimatedTextArea
} from '@/components/AnimatedSection';
import { getAboutContent, getHeroContent, getServices } from '@/utils/airtable';

export default async function Home() {
  const heroContent = await getHeroContent();
  const services = await getServices();
  const aboutContent = await getAboutContent();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AnimatedSection className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement 
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            {heroContent?.heading || 'Crafting Words That Make an Impact'}
          </AnimatedElement>
          <AnimatedElement 
            className="text-xl text-gray-600 mb-8"
          >
            {heroContent?.subheading || 'Professional writing services tailored to your needs. From compelling content to engaging stories.'}
          </AnimatedElement>
          <AnimatedButton 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </AnimatedButton>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="bg-gray-50 py-16 px-4" isContainer>
        <div className="max-w-6xl mx-auto">
          <AnimatedElement className="text-3xl font-bold text-center mb-12">
            Our Services
          </AnimatedElement>
          <div className="grid md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <AnimatedServiceCard
                  key={service.id}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </AnimatedServiceCard>
              ))
            ) : (
              <>
                {[
                  {
                    title: 'Content Writing',
                    description: 'Engaging blog posts, articles, and website content that connects with your audience.'
                  },
                  {
                    title: 'Copywriting',
                    description: 'Persuasive copy that drives action and converts readers into customers.'
                  },
                  {
                    title: 'Technical Writing',
                    description: 'Clear and concise documentation, guides, and technical content.'
                  }
                ].map((service, index) => (
                  <AnimatedServiceCard
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </AnimatedServiceCard>
                ))}
              </>
            )}
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
