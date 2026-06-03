export default function BookCTA({ heading = "Ready to Book Your Luxury Transfer?" }: { heading?: string }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-gold text-xs uppercase tracking-[0.3em] font-semibold mb-3">Get In Touch</p>
        <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">{heading}</h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Available 24/7. Pre-booking recommended. Instant confirmation by email.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/book-a-taxi" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold/30 hover:scale-105">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            Book Online
          </a>
          <a href="tel:+4401252265363" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gold/50 hover:border-gold text-white hover:text-gold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            +44 01252 265363
          </a>
          <a href="https://wa.me/447778356571" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L0 24l6.332-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.958 9.958 0 01-5.12-1.31L2.4 21.96l1.298-4.376A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}