import { useScreenSize } from '@/hooks/use-screen-size';
import { PixelTrail } from '@/components/ui/pixel-trail';
import { GooeyFilter } from '@/components/ui/gooey-filter';
import { TextReveal } from '@/components/ui/text-reveal';

export default function Hero() {
  const screenSize = useScreenSize();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
      <GooeyFilter id="gooey-filter-hero-trail" strength={5} />

      <div className="absolute inset-0 z-0" style={{ filter: 'url(#gooey-filter-hero-trail)' }}>
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 20 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <div className="pointer-events-none relative z-10 flex max-w-4xl flex-col items-center gap-[14px] rounded-[24px] border-2 border-white/10 bg-black/35 px-8 py-10 text-center shadow-[0px_80px_240px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-14 sm:py-14 lg:px-36 lg:py-16">
        <TextReveal
          text="Tori Bryan ദ്ദി •̀ ᴗ •̀ Product Designer"
          className="font-mono text-xs uppercase tracking-[3.6px] text-white/80 sm:text-base lg:text-[20px]"
          stagger={0.035}
        />
        <TextReveal
          text="questioning everything, all the time"
          className="font-serif text-[clamp(2rem,5.5vw,3.5625rem)] leading-[1.2] text-white"
          delay={0.4}
          stagger={0.07}
        />
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-pulse font-sans text-xs uppercase tracking-[0.3em] text-white/40">
        scroll
      </div>
    </div>
  );
}
