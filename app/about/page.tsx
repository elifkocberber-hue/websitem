'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { value: '30+', label: t.about.stat1 },
    { value: '400+', label: t.about.stat2 },
    { value: '%98', label: t.about.stat3 },
    { value: '3', label: t.about.stat4 },
  ];

  const values = [
    { title: t.about.val1_title, desc: t.about.val1_desc },
    { title: t.about.val2_title, desc: t.about.val2_desc },
    { title: t.about.val3_title, desc: t.about.val3_desc },
    { title: t.about.val4_title, desc: t.about.val4_desc },
  ];

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[60vh] min-h-100 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1604424321003-50b9174b28e3?w=1920&q=80"
          alt="El's Dream Factory seramik atölyesi - el yapımı seramik üretim"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative z-10 h-full flex items-end pb-12 md:pb-16">
          <div className="max-w-350 mx-auto px-6 md:px-10 w-full">
            <p className="text-bone/50 text-xs tracking-[0.3em] uppercase mb-4">{t.about.hero_label}</p>
            <h1 className="heading-display text-bone text-4xl md:text-6xl">{t.about.hero_title}</h1>
          </div>
        </div>
      </section>

      {/* ═══════ STORY ═══════ */}
      <section className="max-w-350 mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <p className="text-xs tracking-[0.2em] uppercase text-accent mb-4">{t.about.founded}</p>
            <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-6 whitespace-pre-line">
              {t.about.story_title}
            </h2>
            <p className="text-earth leading-relaxed mb-4">{t.about.story_p1}</p>
            <p className="text-earth leading-relaxed mb-4">{t.about.story_p2}</p>
            <p className="text-earth leading-relaxed">{t.about.story_p3}</p>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative aspect-4/5">
              <Image
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                alt="Seramik üretim süreci"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ PARALLAX DIVIDER ═══════ */}
      <section className="relative h-[40vh] min-h-75 parallax-section parallax-about-divider">
        <div className="absolute inset-0 bg-charcoal/30" />
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="max-w-350 mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="text-center">
                <p className="heading-display text-4xl md:text-5xl text-accent">{stat.value}</p>
                <p className="text-xs tracking-[0.15em] uppercase text-earth mt-3">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════ VALUES (dark) ═══════ */}
      <section className="bg-charcoal py-20 md:py-28">
        <div className="max-w-350 mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase text-clay mb-3">{t.about.values_label}</p>
              <h2 className="heading-display text-3xl md:text-4xl text-bone">{t.about.values_title}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-3xl mx-auto">
            {values.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 100}>
                <div className="border-l border-bone/20 pl-6">
                  <h3 className="heading-serif text-lg text-bone mb-2">{val.title}</h3>
                  <p className="text-bone/50 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT CTA ═══════ */}
      <section className="max-w-350 mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.2em] uppercase text-earth mb-3">{t.about.contact_label}</p>
          <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-6">{t.about.contact_title}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-earth mb-10">
            <p><a href="mailto:elsdreamfactory@gmail.com" className="hover:text-charcoal transition-colors">elsdreamfactory@gmail.com</a></p>
            <p><a href="https://instagram.com/elsdreamfactory" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">instagram.com/elsdreamfactory</a></p>
            <p>Türkiye</p>
          </div>
          <Link
            href="/ceramics"
            className="inline-block bg-charcoal text-bone px-10 py-4 text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300"
          >
            {t.about.browse_btn}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
