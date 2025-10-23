export default function LandingPage() {
  const cardShadow = {
    boxShadow:
      'inset 0px 3px 3px rgba(255, 255, 255, 0.4), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  };

  const floatingImages = [
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-441q73yzqpw8o6y5.webp',
      x: '8%',
      y: '15%',
      rotation: -12,
      size: 120,
    },
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-r237cp3zh1bj5ivs.webp',
      x: '85%',
      y: '10%',
      rotation: 15,
      size: 100,
    },
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-piax0vgvrmnr3tss.webp',
      x: '5%',
      y: '65%',
      rotation: 8,
      size: 110,
    },
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-pg4k4qtmfem0qlho.webp',
      x: '90%',
      y: '70%',
      rotation: -10,
      size: 90,
    },
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-fdm9t6g8p3h4nj7n.webp',
      x: '12%',
      y: '40%',
      rotation: 20,
      size: 95,
    },
    {
      url: 'https://wallpapers.com/images/high/nft-monkey-j0rpoqvt1zl8z03g.webp',
      x: '88%',
      y: '45%',
      rotation: -18,
      size: 105,
    },
  ];

  const features = {
    developers: [
      'Contribute through GitHub and get recognized automatically',
      'Track your merged PRs in real-time',
      'Earn transparent rewards for meaningful contributions',
      'Build your reputation on the Wall of Fame',
    ],
    companies: [
      'Connect GitHub repos with admin privileges',
      'Add bounties to issues seamlessly',
      'Automatically verify merged PRs via webhooks',
      'Attract quality contributors to your projects',
    ],
  };

  const steps = [
    {
      number: 1,
      title: 'Connect Repository',
      description:
        'Companies link their GitHub repos to Mergemint with secure OAuth. Only admins can connect repositories ensuring full control.',
    },
    {
      number: 2,
      title: 'Create Bounties',
      description:
        'Add bounties to GitHub issues directly. Set rewards and watch contributors pick up tasks that match their skills.',
    },
    {
      number: 3,
      title: 'Auto-Verify & Reward',
      description:
        'When PRs merge, GitHub webhooks notify Mergemint. Contributors get instant credit and rewards—no manual tracking needed.',
    },
  ];

  const benefits = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: 'Zero Manual Work',
      description: 'Automatic PR tracking and reward distribution via webhooks',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: 'Secure & Transparent',
      description:
        'GitHub OAuth ensures only authorized access and verifiable contributions',
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      title: 'Community Driven',
      description:
        'Connect developers worldwide with projects that match their expertise',
    },
  ];

  const stats = [
    { value: '100%', label: 'Automated' },
    { value: '0', label: 'Manual Tasks' },
    { value: '∞', label: 'Contributors' },
    { value: '24/7', label: 'Active' },
  ];

  const techStack = [
    { name: 'GitHub API', desc: 'Direct repository integration' },
    { name: 'Supabase', desc: 'Real-time database & auth' },
    { name: 'Webhooks', desc: 'Instant PR notifications' },
    { name: 'OAuth 2.0', desc: 'Secure authentication' },
  ];

  const rewardCards = [
    {
      img: 'https://wallpapers.com/images/high/nft-monkey-cqcs8keyywd67e84.webp',
      label: 'Contributor Badge',
    },
    {
      img: 'https://wallpapers.com/images/high/nft-monkey-j0rpoqvt1zl8z03g.webp',
      label: 'Elite Status',
    },
    {
      img: 'https://wallpapers.com/images/high/nft-monkey-2gqnsrs1nnyi66m2.webp',
      label: 'Legendary Rank',
    },
    {
      img: 'https://wallpapers.com/images/high/nft-monkey-441q73yzqpw8o6y5.webp',
      label: 'Golden Achievement',
    },
  ];

  const footerLinks = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Bounties', href: '/bounties' },
      { name: 'Wall of Fame', href: '/wall-of-fame' },
      { name: 'For Companies', href: '/company' },
    ],
    socials: [
      { name: 'GitHub', href: 'https://github.com/dikjain/mergemint/' },
      { name: 'X (Twitter)', href: 'https://x.com/mahanot_dikshit' },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/dikshit-mahanot-723b012a3/',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {floatingImages.map((img, idx) => (
        <div
          key={idx}
          className="fixed opacity-10 pointer-events-none z-0"
          style={{
            left: img.x,
            top: img.y,
            transform: `rotate(${img.rotation}deg)`,
            width: `${img.size}px`,
            height: `${img.size}px`,
          }}
        >
          <img
            src={img.url}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
            style={cardShadow}
          />
        </div>
      ))}

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div
            className="inline-block px-5 py-2 bg-black text-white rounded-full"
            style={cardShadow}
          >
            <span className="text-sm font-nunito font-medium">
              Developer–Company Collaboration Platform
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold text-black font-exo-2 tracking-tight leading-tight">
            Mergemint
          </h1>

          <p className="text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-nunito font-medium">
            Bridge the gap between open-source contributors and maintainers.
            Automate bounty tracking, verify merged PRs, and deliver transparent
            rewards. All powered by GitHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-10">
            <a
              href="/dashboard"
              className="px-10 py-5 bg-black text-white rounded-xl font-nunito text-lg font-bold hover:bg-neutral-800 transition-all"
              style={cardShadow}
            >
              I'm a Developer
            </a>
            <a
              href="/company"
              className="px-10 py-5 bg-white text-black border-2 border-black rounded-xl font-nunito text-lg font-bold hover:bg-neutral-50 transition-all"
              style={cardShadow}
            >
              I'm a Company
            </a>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-black mb-6 font-exo-2">
            What is Mergemint?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto font-nunito leading-relaxed">
            Mergemint is a developer–company collaboration platform that
            connects GitHub repositories to automate bounty tracking and
            rewards. Companies can link their repos, add bounties to issues, and
            automatically verify merged pull requests via secure GitHub
            webhooks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            className="bg-black text-white rounded-3xl p-12"
            style={cardShadow}
          >
            <h3 className="text-3xl font-bold mb-6 font-exo-2">
              For Developers
            </h3>
            <ul className="space-y-4 font-nunito text-lg">
              {features.developers.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-neutral-50 rounded-3xl p-12 border-2 border-neutral-300"
            style={cardShadow}
          >
            <h3 className="text-3xl font-bold mb-6 font-exo-2 text-black">
              For Companies
            </h3>
            <ul className="space-y-4 font-nunito text-lg text-neutral-700">
              {features.companies.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="relative z-10 bg-neutral-50 py-32 border-y-2 border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-black mb-20 font-exo-2">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-10 border border-neutral-300"
                style={cardShadow}
              >
                <div
                  className="w-16 h-16 bg-black rounded-2xl mb-8 flex items-center justify-center font-exo-2 text-3xl text-white font-bold"
                  style={cardShadow}
                >
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 font-exo-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed font-nunito text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold text-black mb-8 font-exo-2">
              Why Mergemint?
            </h2>
            <p className="text-xl text-neutral-600 mb-10 font-nunito leading-relaxed">
              Built with Supabase and GitHub APIs, Mergemint simplifies
              open-source monetization by bridging contributors and
              maintainers—turning meaningful contributions into measurable
              impact and rewards without manual tracking.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 bg-black rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={cardShadow}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-black mb-2 font-exo-2">
                      {benefit.title}
                    </h4>
                    <p className="text-neutral-600 font-nunito">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 text-white rounded-2xl p-8 text-center"
                style={cardShadow}
              >
                <div className="text-5xl font-bold mb-2 font-exo-2">
                  {stat.value}
                </div>
                <div className="font-nunito text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 bg-neutral-50 py-24 border-y-2 border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-black mb-16 font-exo-2">
            Powered By Industry Standards
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-xl p-8 border-2 border-neutral-300 text-center hover:border-black transition-all"
                style={cardShadow}
              >
                <div className="text-2xl font-bold text-black mb-2 font-exo-2">
                  {tech.name}
                </div>
                <div className="text-sm text-neutral-600 font-nunito">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Cards Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-bold text-center text-black mb-20 font-exo-2">
          Unlock Your Rewards
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {rewardCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 rounded-2xl p-6 border border-neutral-300 hover:scale-105 transition-transform"
              style={cardShadow}
            >
              <img
                src={card.img}
                alt={card.label}
                className="w-full h-48 object-cover rounded-xl mb-4"
                style={cardShadow}
              />
              <div className="text-center font-nunito font-bold text-lg text-black">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div
          className="bg-black text-white rounded-3xl p-16"
          style={cardShadow}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 font-exo-2">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-neutral-300 mb-12 font-nunito leading-relaxed max-w-3xl mx-auto">
            Turn meaningful contributions into measurable impact. Bridge
            contributors and maintainers without manual tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/dashboard"
              className="inline-block px-12 py-6 bg-white text-black rounded-xl font-nunito text-xl font-bold hover:bg-neutral-100 transition-all"
              style={cardShadow}
            >
              Join as Developer
            </a>
            <a
              href="/company"
              className="inline-block px-12 py-6 bg-neutral-800 text-white border-2 border-white rounded-xl font-nunito text-xl font-bold hover:bg-neutral-700 transition-all"
              style={cardShadow}
            >
              Register Company
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-2 border-neutral-200 bg-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 font-exo-2">
                Mergemint
              </h3>
              <p className="text-neutral-600 font-nunito">
                Simplifying open-source monetization through automated bounty
                tracking and transparent rewards.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-4 font-exo-2">
                Platform
              </h4>
              <ul className="space-y-2 font-nunito text-neutral-600">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-black transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-4 font-exo-2">
                Socials
              </h4>
              <ul className="space-y-2 font-nunito text-neutral-600">
                {footerLinks.socials.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-black transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-300 pt-8 text-center">
            <p className="text-neutral-500 font-nunito">
              © 2025 Mergemint. All rights reserved. Built with ❤️ for
              open-source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
