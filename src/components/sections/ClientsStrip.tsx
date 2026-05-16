/** Infinite horizontal scroll strip showing real JM Publicidad client names */

const CLIENTS = [
  'Toscana',
  'Sucesores',
  'Adelca',
  'Continental',
  'Softlanding',
  'Abrus',
  'Juntos por Ecuador',
];

/** Separator glyph between client names */
function Sep() {
  return (
    <span className="mx-6 text-jm-primary text-sm select-none" aria-hidden="true">
      ✦
    </span>
  );
}

/** One full set of client names */
function ClientList() {
  return (
    <>
      {CLIENTS.map((name) => (
        <span key={name} className="inline-flex items-center shrink-0">
          <span className="font-manrope font-bold text-[13px] tracking-[0.18em] uppercase text-[#9e9890]">
            {name}
          </span>
          <Sep />
        </span>
      ))}
    </>
  );
}

/** Full-width dark marquee strip — placed directly below the hero to cover the Unicorn Studio watermark */
export function ClientsStrip() {
  return (
    <div
      className="w-full bg-[#1c1d1b] overflow-hidden py-4 border-t border-b border-[#2e2f2c]"
      aria-label="Algunos de nuestros clientes"
    >
      {/* Edge fade masks */}
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #1c1d1b, transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #1c1d1b, transparent)' }}
          aria-hidden="true"
        />

        {/* Marquee track — two identical sets for seamless loop */}
        <div className="animate-marquee flex whitespace-nowrap">
          <ClientList />
          <ClientList />
        </div>
      </div>
    </div>
  );
}
