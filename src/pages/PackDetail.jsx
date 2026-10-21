import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/layout/Seo';
import ContactCTA from '../components/sections/ContactCTA';
import PackVisual from '../components/sections/PackVisual';
import SectionHead from '../components/ui/SectionHead';
import Eyebrow from '../components/ui/Eyebrow';
import RevealText from '../components/ui/RevealText';
import FadeUp from '../components/ui/FadeUp';
import Chip from '../components/ui/Chip';
import TiltCard from '../components/ui/TiltCard';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Marquee from '../components/ui/Marquee';
import ToolTile from '../components/ui/ToolTile';
import PlanMedia from '../components/ui/PlanMedia';
import { packBySlug, packs } from '../data/packs';
import { planMedia } from '../data/planMedia';

export default function PackDetail() {
  const { slug } = useParams();
  const pack = packBySlug(slug);
  if (!pack) return <Navigate to="/services" replace />;

  const m = planMedia[pack.slug];
  const idx = packs.indexOf(pack);
  const next = packs[(idx + 1) % packs.length];
  const nextMedia = planMedia[next.slug];
  const flip = idx % 2 === 1; // alternate the offset side from plan to plan

  return (
    <div className="plan" style={{ '--plan': m.accent }}>
      <Seo title={`${pack.name} — Plan ${pack.number}`} path={`/services/${pack.slug}`} description={`${pack.short} ${pack.tagline}`} />

      {/* ── Hero: copy + real media with floating pins ── */}
      <section className={`phero${flip ? ' is-flip' : ''}`} data-glow>
        <span className="phero-numeral" aria-hidden="true">
          {pack.number}
        </span>
        <div className="container phero-grid">
          <div className="phero-copy">
            <FadeUp y={12}>
              <Eyebrow>
                Plan {pack.number} · {pack.kicker}
                {pack.focus ? ' · Our focus' : ''}
              </Eyebrow>
            </FadeUp>
            <RevealText
              as="h1"
              className="display phero-title"
              text={pack.name.replace(/(\S+)$/, '*$1*')}
              immediate
              delay={0.25}
            />
            <FadeUp delay={0.4}>
              <p className="lead">{pack.tagline}</p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <dl className="phero-facts">
                <div>
                  <dt>Engagement</dt>
                  <dd>{pack.engagement}</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>{pack.timeline}</dd>
                </div>
                <div>
                  <dt>After launch</dt>
                  <dd>{pack.support}</dd>
                </div>
              </dl>
            </FadeUp>
            <FadeUp delay={0.6} className="phero-ctas">
              <Button to="/contact" size="lg">
                Start with a free audit
              </Button>
              <a href="#flow" className="phero-peek">
                <span>See how it works</span>
                <i aria-hidden="true">
                  <Icon name="arrowRight" size={16} stroke={2} />
                </i>
              </a>
            </FadeUp>
          </div>

          <FadeUp className="phero-media" delay={0.3}>
            <PlanMedia media={m} lazy={false} />
          </FadeUp>
        </div>
      </section>

      {/* ── Who it is for ── */}
      <section className="pfor">
        <div className="container pfor-inner">
          <FadeUp>
            <span className="eyebrow">Built for</span>
            <p className="display pfor-text">{pack.forWho}</p>
          </FadeUp>
          <FadeUp className="chips" delay={0.1}>
            {pack.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── How it flows: visual + steps ── */}
      <section className="section pstory" id="flow">
        <div className="container pstory-grid">
          <FadeUp className="pstory-visual">
            <TiltCard className="pack-visual-card" max={6}>
              <PackVisual kind={pack.visual} />
            </TiltCard>
          </FadeUp>
          <div className="pstory-copy">
            <FadeUp y={10}>
              <Eyebrow num="01">How it works</Eyebrow>
            </FadeUp>
            <RevealText text={m.storyTitle} className="h2 pstory-title" />
            <ol className="pstory-steps">
              {m.story.map((s, i) => (
                <FadeUp as="li" className="pstep" key={s.t} delay={0.1 + i * 0.1}>
                  <span className="pstep-n">{i + 1}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </FadeUp>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Connected tools ── */}
      <section className="ptools">
        <p className="ptools-label">Connects with the tools you already use</p>
        <Marquee items={m.tools} speed={36} render={(t) => <ToolTile name={t} />} />
      </section>

      {/* ── What's inside (offset cards) ── */}
      <section className="section pack-services">
        <div className="container">
          <SectionHead
            num="02"
            eyebrow="What's inside"
            title={`${pack.services.length} services.\nAutomation in *every* one.`}
            lead="Each service has two layers: the professional deliverable you'd expect — and the smart features that keep working without you."
            split
          />
          <div className="svc-list">
            {pack.services.map((s, i) => (
              <motion.article
                className={`svc ${i % 2 ? 'is-right' : 'is-left'}`}
                key={s.title}
                initial={{ opacity: 0, x: i % 2 ? 70 : -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="svc-ghost" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="svc-head">
                  <span className="svc-num">
                    {pack.number}.{i + 1}
                  </span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="svc-phil">{s.philosophy}</p>
                </div>
                <div className="svc-cols">
                  <div className="svc-col">
                    <h4>Core deliverables</h4>
                    <ul className="ticks">
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="svc-col smart">
                    <h4>
                      Smart features <span>— the Nuvō difference</span>
                    </h4>
                    <ul className="ticks gold">
                      {s.smart.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section on-cream ptime">
        <div className="container">
          <SectionHead num="03" eyebrow="Timeline" title={'How it comes\n*together.*'} split lead="You review at every milestone. Nothing goes live until you're happy with it." />
          <div className="timeline">
            {pack.weeks.map((w, i) => (
              <FadeUp className="tl-step" key={w.w} delay={i * 0.1}>
                <span className="tl-k">{w.w}</span>
                {/* The trigger sits on the full-width track (not on the bar that starts at
                    scaleX 0), so every week reliably fills. */}
                <motion.span
                  className="tl-bar"
                  initial="hide"
                  whileInView="show"
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                >
                  <motion.i
                    variants={{
                      hide: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 1, delay: 0.15 + i * 0.25, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  />
                </motion.span>
                <p>{w.t}</p>
              </FadeUp>
            ))}
          </div>
          {pack.addons?.length > 0 && (
            <FadeUp className="addons">
              <span className="eyebrow">Popular add-ons</span>
              <div className="chips">
                {pack.addons.map((a) => (
                  <Chip key={a} tone="dark">
                    + {a}
                  </Chip>
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── Next plan: media card ── */}
      <section className="pnext">
        <div className="container">
          <Link to={`/services/${next.slug}`} className="pnext-card" style={{ '--plan': nextMedia.accent }}>
            <span className="pnext-media" aria-hidden="true">
              <img src={nextMedia.kind === 'video' ? nextMedia.poster : nextMedia.src} alt="" loading="lazy" style={{ objectPosition: nextMedia.pos }} />
            </span>
            <span className="pnext-shade" aria-hidden="true" />
            <span className="pnext-text">
              <span className="eyebrow">Next plan · {next.number}</span>
              <span className="display pnext-title">{next.name}</span>
              <span className="pnext-sub">{next.short}</span>
            </span>
            <span className="pnext-go" aria-hidden="true">
              <Icon name="arrowUpRight" size={26} stroke={1.8} />
            </span>
          </Link>
        </div>
      </section>

      <ContactCTA num="04" />
    </div>
  );
}
