import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { initHeroScene, disposeHeroScene } from './heroScene.js';

gsap.registerPlugin(ScrollTrigger);

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

function useDragonEyes() {
  useEffect(() => {
    const eyes = document.querySelectorAll('.dragon-eye');
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      eyes.forEach((eye, idx) => {
        const offsetX = (idx === 0 ? -1 : 1) * 40;
        const tx = x * 40 + offsetX;
        const ty = y * 20;
        eye.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
}

function useLoadingOverlay() {
  useEffect(() => {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    const tl = gsap.timeline();
    tl.to('.dragon-loader-ring', {
      rotate: 360,
      repeat: -1,
      ease: 'none',
      duration: 2.4,
    });
    setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => overlay.remove(),
      });
    }, 1400);
  }, []);
}

function Hero() {
  const { scrollY } = useScroll();
  const lavaTranslate = useTransform(scrollY, [0, 600], [0, 80]);
  const islandsTranslate = useTransform(scrollY, [0, 600], [0, -80]);

  useEffect(() => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const cleanup = initHeroScene(canvas);
    return cleanup;
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-bgDeep to-black"
    >
      <canvas
        id="hero-canvas"
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      {/* fire particles overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-hero-noise opacity-40 mix-blend-screen"
        aria-hidden="true"
      />
      {/* gradient vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-5 sm:px-10 pt-4 sm:pt-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-lava via-draco to-neonPurple shadow-glow-red flex items-center justify-center">
              <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase">
                RD
              </span>
            </div>
            <div>
              <p className="font-display text-sm tracking-[0.35em] uppercase text-gray-300">
                ROBU DRAGON
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.25em]">
                Roblox Dragon Empire
              </p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-8 text-xs font-medium text-gray-300">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#economy" className="nav-link">
              Economy
            </a>
            <a href="#marketplace" className="nav-link">
              Marketplace
            </a>
            <a href="#community" className="nav-link">
              Community
            </a>
            <div className="relative">
              <span className="nav-pill">Roblox Gamepass Only</span>
            </div>
          </nav>
        </header>

        <div className="px-5 sm:px-10 pt-16 pb-20 sm:pt-20 sm:pb-28 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="max-w-xl lg:max-w-2xl">
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight bg-gradient-to-br from-gray-100 via-draco to-neonPurple bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Forge. Evolve.
              <br />
              <span className="text-lava">Conquer.</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Build the strongest dragon empire in Roblox. Hatch legendary
              dragons, raid bosses, trade safely, and harness a tightly balanced
              Draco-to-Robux economy—without pay-to-win.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <button className="btn-primary">
                Play Now
                <span className="btn-glow" />
              </button>
              <button className="btn-ghost">Buy Dragons</button>
              <button className="btn-outline">View Marketplace</button>
            </motion.div>

            <motion.div
              className="mt-8 grid grid-cols-3 gap-4 max-w-md text-[11px] sm:text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="glass-tile">
                <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px]">
                  Max Daily Robux
                </p>
                <p className="mt-1 font-display text-lg text-draco">
                  50
                  <span className="text-[10px] ml-1 text-gray-400">
                    (at max level)
                  </span>
                </p>
              </div>
              <div className="glass-tile">
                <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px]">
                  Draco &rarr; Robux
                </p>
                <p className="mt-1 font-display text-lg text-lava">
                  100,000
                  <span className="text-[10px] ml-1 text-gray-400">
                    Draco = 1 Robux
                  </span>
                </p>
              </div>
              <div className="glass-tile">
                <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px]">
                  Anti-Exploit
                </p>
                <p className="mt-1 font-display text-lg text-neonPurple">
                  Active
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative w-full max-w-md lg:max-w-lg"
            style={{ y: islandsTranslate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative rounded-[28px] border border-white/5 bg-glass/80 backdrop-blur-xl p-5 shadow-[0_0_60px_rgba(255,80,80,0.4)]">
              <div className="relative h-64 sm:h-72 overflow-hidden rounded-2xl bg-gradient-to-b from-bgDeep via-black to-bgDeep">
                <div className="absolute inset-0 lava-river" />
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-32 islands-layer"
                  style={{ y: lavaTranslate }}
                />
                <div className="absolute inset-0 pointer-events-none dragon-silhouette" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                    Volcanic Dragon Nexus
                  </p>
                  <p className="font-display text-sm text-gray-100">
                    Real-time boss raids &amp; trading
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="inline-flex h-2 w-2 rounded-full bg-lava animate-pulse" />
                  <span className="text-gray-400">
                    Live Players:{' '}
                    <span className="font-semibold text-draco">12,384</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-[10px]">
                <div className="mini-pill mini-pill-gold">
                  <span>AFK Protection</span>
                </div>
                <div className="mini-pill mini-pill-purple">
                  <span>Anti-Bot</span>
                </div>
                <div className="mini-pill mini-pill-red">
                  <span>Fair Economy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Dragon Evolution',
      subtitle: 'Visual growth & fire escalation',
      bullets: [
        'Multi-stage dragon growth trees',
        'Wings, horns & scales evolve visually',
        'Fire intensity scales with progression',
      ],
      accent: 'lava',
    },
    {
      title: 'Draco Economy',
      subtitle: 'Balanced, anti-exploit system',
      bullets: [
        '100,000 Draco = 1 Robux',
        'Max 50 Robux/day at max level',
        'Smart anti-farm & anti-bot systems',
      ],
      accent: 'draco',
    },
    {
      title: 'Boss Raids',
      subtitle: 'Cinematic world bosses',
      bullets: [
        'Co-op raids with scaling difficulty',
        'Telegraphed boss patterns',
        'Robux-safe Draco rewards only',
      ],
      accent: 'neonPurple',
    },
    {
      title: 'Trading System',
      subtitle: 'Safe, limited marketplace',
      bullets: [
        'Secure trade verification',
        'Trading cooldown to prevent abuse',
        'Marketplace Draco tax for balance',
      ],
      accent: 'draco',
    },
    {
      title: 'PvP Arena',
      subtitle: 'Ranked, seasonal ladders',
      bullets: [
        'Skill-based MMR, no pay-to-win',
        'Seasonal cosmetic rewards only',
        'Anti-exploit detection live',
      ],
      accent: 'lava',
    },
    {
      title: 'Legendary Eggs',
      subtitle: 'Mythic & divine hatch rates',
      bullets: [
        'Transparent rarity odds',
        'AFK-open protection',
        'Ultra-rare mythic dragons',
      ],
      accent: 'neonPurple',
    },
  ];
  return (
    <section
      id="features"
      className="relative bg-gradient-to-b from-black via-bgDark to-black py-16 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <motion.div {...sectionFade} className="flex flex-col gap-2 mb-8">
          <p className="section-tag">Core Systems</p>
          <h2 className="section-title">
            AAA Dragon Progression &amp; Fair Play
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <motion.article
              key={f.title}
              className="feature-card"
              {...sectionFade}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg text-gray-100">
                  {f.title}
                </h3>
                <span className={`feature-chip feature-chip-${f.accent}`}>
                  AAA
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{f.subtitle}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-gray-300">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-lava to-draco" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marketplace() {
  const rarities = [
    {
      tier: 'Common',
      color: 'gray',
      glow: '',
      draco: '250 - 800',
      desc: 'Starter dragons to begin your empire.',
    },
    {
      tier: 'Rare',
      color: 'draco',
      glow: 'shadow-glow-gold',
      draco: '1,000 - 4,500',
      desc: 'Enhanced stats with visible growth.',
    },
    {
      tier: 'Epic',
      color: 'neonPurple',
      glow: 'shadow-glow-purple',
      draco: '5,000 - 18,000',
      desc: 'Unique models & elemental effects.',
    },
    {
      tier: 'Legendary',
      color: 'lava',
      glow: 'shadow-glow-red',
      draco: '25,000 - 80,000',
      desc: 'Signature dragons with cinematic auras.',
    },
    {
      tier: 'Mythic',
      color: 'neonPurple',
      glow: 'shadow-glow-purple',
      draco: '100,000+',
      desc: 'Ultra-rare, tracked across servers.',
    },
    {
      tier: 'Divine',
      color: 'draco',
      glow: 'shadow-glow-gold',
      draco: 'Exclusive',
      desc: 'Seasonal, one-of-a-kind dragon relics.',
    },
  ];
  return (
    <section
      id="marketplace"
      className="relative bg-gradient-to-b from-black via-bgDeep to-black py-16 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <motion.div {...sectionFade} className="flex flex-col gap-2 mb-8">
          <p className="section-tag">Premium Marketplace</p>
          <h2 className="section-title">
            Futuristic Dragon Trading Nexus
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {rarities.map((r, idx) => (
            <motion.article
              key={r.tier}
              className={`market-card ${r.glow}`}
              {...sectionFade}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`font-display text-lg text-${r.color}-400 uppercase tracking-[0.2em]`}
                >
                  {r.tier}
                </h3>
                <span className="rarity-pip" />
              </div>

              <p className="text-xs text-gray-300">{r.desc}</p>

              <p className="mt-3 text-[11px] uppercase text-gray-400 tracking-[0.25em]">
                Draco Range
              </p>
              <p className="font-display text-lg text-draco">
                {r.draco}
              </p>

              <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                <span>Hover to preview</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-lava animate-pulse" />
                  Limited supply
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Economy() {
  return (
    <section
      id="economy"
      className="relative bg-gradient-to-b from-black via-bgDark to-black py-16 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <motion.div {...sectionFade} className="flex flex-col gap-2 mb-8">
          <p className="section-tag">Draco &amp; Robux</p>
          <h2 className="section-title">
            Fair &amp; Controlled Conversion Economy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
          <motion.div
            className="glass-panel"
            {...sectionFade}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                  Conversion Rate
                </p>
                <p className="mt-1 font-display text-2xl text-draco">
                  100,000 Draco
                  <span className="mx-2 text-sm text-gray-400">
                    =
                  </span>
                  <span className="text-lava">1 Robux</span>
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-[11px] text-gray-400">
                <span className="inline-flex h-2 w-2 rounded-full bg-draco animate-pulse" />
                Roblox-compliant conversion
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs">
              <div className="economy-pill">
                <h3>Daily Withdrawal Limits</h3>
                <p>Max 50 Robux per day even at max level.</p>
              </div>
              <div className="economy-pill">
                <h3>Anti-Exploit Layers</h3>
                <p>
                  AFK timers, behavioral checks, and manual review for
                  suspicious patterns.
                </p>
              </div>
              <div className="economy-pill">
                <h3>Level Requirements</h3>
                <p>
                  Conversion unlocks only after real gameplay progression and
                  quests.
                </p>
              </div>
              <div className="economy-pill">
                <h3>Marketplace Taxes</h3>
                <p>
                  Draco sink through marketplace tax to keep the economy stable
                  and fair.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel"
            {...sectionFade}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-display text-sm text-gray-200 mb-3">
              Anti-Farm &amp; Anti-Bot Systems
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex gap-2">
                <span className="mt-1 dot dot-lava" />
                <span>
                  <strong>AFK Farming Protection:</strong> diminished Draco
                  yield after inactivity or repetitive patterns.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 dot dot-purple" />
                <span>
                  <strong>Anti-Bot Verification:</strong> periodic in-game
                  verification gates to ensure human play.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 dot dot-gold" />
                <span>
                  <strong>Trading Cooldowns:</strong> staggered trade windows
                  to block mass transfers between alt accounts.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 dot dot-gray" />
                <span>
                  <strong>Robux Fairness:</strong> premium players get
                  convenience boosts only—never direct Robux multipliers.
                </span>
              </li>
            </ul>

            <div className="mt-4 text-[11px] text-gray-500 border-t border-white/5 pt-3">
              All Draco-to-Robux conversions are logged, rate-limited, and
              protected by server-side validation and anti-exploit review.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Gamepasses() {
  const passes = [
    {
      name: 'VIP Dragon',
      desc: 'Exclusive cosmetic dragon with premium aura & lobby flex.',
      tag: 'Cosmetic',
    },
    {
      name: '2x Draco',
      desc: 'Earn Draco faster without breaking balancing caps.',
      tag: 'Convenience',
    },
    {
      name: 'Fast Hatch',
      desc: 'Skip wait timers while keeping the same drop chances.',
      tag: 'Time Saver',
    },
    {
      name: 'Legendary Egg',
      desc: 'Access to legendary egg drops with transparent odds.',
      tag: 'Loot Access',
    },
    {
      name: 'Dragon Slots',
      desc: 'Carry more active dragons for strategic builds.',
      tag: 'Utility',
    },
    {
      name: 'Premium Wings',
      desc: 'Animated wing cosmetics & unique fly-in effects.',
      tag: 'Cosmetic',
    },
    {
      name: 'Auto Battle',
      desc: 'Smart auto-combat with reduced Draco efficiency.',
      tag: 'Convenience',
    },
    {
      name: 'Draco Booster',
      desc: 'Periodic Draco bursts with soft caps & diminishing returns.',
      tag: 'Convenience',
    },
  ];
  return (
    <section className="relative bg-gradient-to-b from-black via-bgDeep to-black py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <motion.div {...sectionFade} className="flex flex-col gap-2 mb-8">
          <p className="section-tag">Roblox Gamepasses Only</p>
          <h2 className="section-title">
            Premium Convenience, Not Pay-to-Win
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {passes.map((p, idx) => (
            <motion.article
              key={p.name}
              className="pass-card"
              {...sectionFade}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
            >
              <div className="pass-glow" />
              <h3 className="font-display text-sm text-gray-100">
                {p.name}
              </h3>
              <span className="pass-tag">{p.tag}</span>
              <p className="mt-2 text-xs text-gray-300">{p.desc}</p>
              <button className="pass-button">
                Purchase Gamepass
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section
      id="community"
      className="relative bg-gradient-to-b from-black via-bgDark to-black py-16 sm:py-24"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <motion.div {...sectionFade} className="flex flex-col gap-2 mb-8">
          <p className="section-tag">Community Nexus</p>
          <h2 className="section-title">
            Join the Dragon Empire Network
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6">
          <motion.div
            className="glass-panel"
            {...sectionFade}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                  Discord Forge
                </p>
                <p className="font-display text-lg text-gray-100">
                  Discord.gg / RobuDragon
                </p>
              </div>
              <button className="btn-outline text-xs">
                Join Discord
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lava animate-pulse" />
                Live events &amp; tournaments
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-draco animate-pulse" />
                Build, trading &amp; balance feedback
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-xs">
              <div className="community-tile">
                <p className="tile-label">Roblox Group</p>
                <p className="font-display text-sm text-gray-100">
                  ROBU DRAGON EMPIRE
                </p>
                <p className="mt-1 text-gray-400">
                  Official Roblox group for payouts, announcements &amp;
                  compliance.
                </p>
              </div>
              <div className="community-tile">
                <p className="tile-label">Seasonal Tournaments</p>
                <p className="font-display text-sm text-gray-100">
                  Dragon Seasons
                </p>
                <p className="mt-1 text-gray-400">
                  Ladder resets, mythic cosmetic rewards, and balanced
                  competition.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel"
            {...sectionFade}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
              Live Player Stats
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              <div className="stat-card">
                <p className="stat-label">Live Players</p>
                <p className="stat-value text-draco">12,384</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Boss Raids</p>
                <p className="stat-value text-lava">48 Active</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Marketplace</p>
                <p className="stat-value text-neonPurple">
                  1,209 Listings
                </p>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-gray-400">
              Events Banner:
              <div className="mt-2 rounded-lg border border-lava/40 bg-gradient-to-r from-lava/20 via-bgDeep to-neonPurple/20 px-3 py-2">
                <p className="font-display text-xs text-gray-100">
                  Infernal Season: Divine Dragon Trials
                </p>
                <p className="text-[11px] text-gray-300 mt-1">
                  Limited-time divine dragons, seasonal PvP ladders, and
                  unique wing cosmetics—no permanent power creep.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-lava via-draco to-neonPurple flex items-center justify-center">
            <span className="text-[10px] font-display tracking-[0.2em]">
              RD
            </span>
          </div>
          <div className="text-xs text-gray-400">
            <p className="font-display tracking-[0.25em] uppercase">
              Robu Dragon
            </p>
            <p>
              AAA Roblox MMORPG &amp; Dragon Economy — Balanced, compliant,
              cinematic.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-[11px] text-gray-400">
          <a href="#" className="footer-link">
            Terms
          </a>
          <a href="#" className="footer-link">
            Privacy
          </a>
          <a href="#" className="footer-link">
            Roblox Compliance
          </a>
          <a href="#" className="footer-link">
            Anti-Exploit Policy
          </a>
          <a href="#" className="footer-link">
            Support Center
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useDragonEyes();
  useLoadingOverlay();

  useEffect(() => {
    const roar = new Audio('dragon-roar.mp3');
    roar.volume = 0.35;
    const playRoar = () => {
      try {
        roar.currentTime = 0;
        roar.play();
      } catch {}
    };
    const hero = document.getElementById('top');
    if (!hero) return;
    hero.addEventListener('mouseenter', playRoar);
    return () => hero.removeEventListener('mouseenter', playRoar);
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#features',
      start: 'top center',
      onEnter: () =>
        gsap.to(document.body, {
          backgroundColor: '#050509',
          duration: 1,
          ease: 'power2.out',
        }),
    });
  }, []);

  return (
    <div className="font-body text-gray-100">
      <Hero />
      <Features />
      <Marketplace />
      <Economy />
      <Gamepasses />
      <Community />
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);