import { getAboutContent, getHeroContent, getServices } from '@/utils/airtable';

export default async function Home() {
  const heroContent = await getHeroContent();
  const services = await getServices();
  const aboutContent = await getAboutContent();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {heroContent?.heading || 'Crafting Words That Make an Impact'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {heroContent?.subheading || 'Professional writing services tailored to your needs. From compelling content to engaging stories.'}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Content Writing</h3>
                  <p className="text-gray-600">Engaging blog posts, articles, and website content that connects with your audience.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Copywriting</h3>
                  <p className="text-gray-600">Persuasive copy that drives action and converts readers into customers.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Technical Writing</h3>
                  <p className="text-gray-600">Clear and concise documentation, guides, and technical content.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {aboutContent?.heading || 'About Us'}
          </h2>
          {aboutContent?.description ? (
            aboutContent.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 text-lg text-center mb-6 last:mb-0">
                {paragraph}
              </p>
            ))
          ) : (
            <>
              <p className="text-gray-600 text-lg text-center mb-6">
                We are a team of passionate writers dedicated to delivering high-quality content that helps businesses grow and engage their audience.
              </p>
              <p className="text-gray-600 text-lg text-center">
                With years of experience across various industries, we understand what it takes to create content that resonates and delivers results.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
