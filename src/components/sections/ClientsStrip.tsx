import toscana from '../../assets/clients/toscana.png';
import sucesores from '../../assets/clients/sucesores.png';
import adelca from '../../assets/clients/adelca.png';
import continental from '../../assets/clients/continental.png';
import softlanding from '../../assets/clients/softlanding.png';
import abrus from '../../assets/clients/abrus.png';

const LOGOS = [
  { src: toscana,     alt: 'Toscana',     dark: true  },
  { src: sucesores,   alt: 'Sucesores',   dark: true  },
  { src: adelca,      alt: 'Adelca',      dark: false },
  { src: continental, alt: 'Continental', dark: false },
  { src: softlanding, alt: 'Softlanding', dark: false },
  { src: abrus,       alt: 'Abrus',       dark: false },
];

function LogoTrack() {
  return (
    <>
      {LOGOS.map(({ src, alt, dark }) => (
        <div
          key={alt}
          className={`
            flex-shrink-0 flex items-center justify-center
            mx-4 px-6 py-4 rounded-xl
            w-[160px] h-[90px]
            ${dark ? 'bg-[#1c1d1b]' : 'bg-white border border-[#e0ddd8]'}
          `}
        >
          <img
            src={src}
            alt={alt}
            width={120}
            height={52}
            className="max-h-[52px] max-w-[120px] w-auto h-auto object-contain select-none"
            draggable={false}
          />
        </div>
      ))}
    </>
  );
}

/** Infinite logo carousel — overlaps the hero bottom to cover the Unicorn Studio watermark */
export function ClientsStrip() {
  return (
    <section className="relative z-10 -mt-16 w-full bg-jm-bg-section border-t border-b border-[#e4e2df] pt-10 pb-10">
      {/* Label */}
      <p className="text-center font-inter font-medium text-jm-body text-xs tracking-[0.2em] uppercase mb-8">
        Algunos de nuestros Clientes
      </p>

      {/* Carousel wrapper */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f6f3ef, transparent)' }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f6f3ef, transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track — two copies for seamless loop */}
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'jm-scroll-left 28s linear infinite',
            willChange: 'transform',
          }}
        >
          <LogoTrack />
          <LogoTrack />
        </div>
      </div>
    </section>
  );
}
