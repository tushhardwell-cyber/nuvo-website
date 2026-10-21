import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { packs } from '../../data/packs';
import { planMedia } from '../../data/planMedia';
import Video from '../ui/Video';
import Icon from '../ui/Icon';
import BrandMark from '../ui/BrandMark';
import Eyebrow from '../ui/Eyebrow';
import RevealText from '../ui/RevealText';
import FadeUp from '../ui/FadeUp';
import { useReducedMotion } from '../../hooks/useMedia';
import { useLang } from '../../i18n/LangContext';

// Four panels in a row. The active one opens to show its media, story and a
// turning arrow. It cycles on its own until the visitor hovers or focuses one —
// the movement invites the click.
export default function PlanShowcase({ num = '01' }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % packs.length), 4200);
    return () => clearInterval(id);
  }, [paused, reduce]);

  return (
    <section className="pshow theme-dark">
      <div className="container">
        <div className="pshow-head">
          <FadeUp y={10}>
            <Eyebrow num={num}>Choose your starting point</Eyebrow>
          </FadeUp>
          <RevealText text={'Four plans.\nOne *connected* business.'} className="h2" />
        </div>
      </div>

      <div
        className="pshow-row container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {packs.map((p, i) => {
          const m = planMedia[p.slug];
          const on = i === active;
          return (
            <Link
              key={p.slug}
              to={`/services/${p.slug}`}
              className={`pshow-panel${on ? ' is-active' : ''}`}
              style={{ '--plan': m.accent }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => {
                setActive(i);
                setPaused(true);
              }}
              onBlur={() => setPaused(false)}
              aria-label={t(`${p.name} — plan ${p.number}`)}
            >
              <span className="pshow-media" aria-hidden="true">
                {m.kind === 'video' ? (
                  <Video src={m.src} poster={m.poster} fill />
                ) : (
                  <img src={m.src} alt="" loading="lazy" style={{ objectPosition: m.pos }} />
                )}
              </span>
              <span className="pshow-shade" aria-hidden="true" />

              <span className="pshow-vtitle" aria-hidden="true">
                <b>{p.number}</b>
                {p.name}
              </span>

              <span className="pshow-body">
                <span className="pshow-n">Plan {p.number}</span>
                <strong className="pshow-name">{p.name}</strong>
                <span className="pshow-tag">{p.tagline}</span>
                <span className="pshow-tools" aria-hidden="true">
                  {m.tools.slice(0, 4).map((t) => (
                    <span key={t} className="pshow-tool">
                      <BrandMark name={t} size={18} />
                    </span>
                  ))}
                </span>
                <span className="pshow-meta">{p.timeline}</span>
              </span>

              <span className="pshow-go" aria-hidden="true">
                <Icon name="arrowUpRight" size={22} stroke={1.8} />
              </span>
              {on && !reduce && <span className="pshow-timer" key={`t-${active}-${paused}`} data-paused={paused} />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
