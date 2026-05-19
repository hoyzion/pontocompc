"use client";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect } from "react";

const TITULOS = [
  "Redes e Infraestrutura",
  "Manutenção de Celulares",
  "Montagem de PCs",
  "Mídia Digital in-Store"
];

export default function Home() {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showSplash, setShowSplash] = useState(true);
  const [splashStep, setSplashStep] = useState(1); 
  const [showCookie, setShowCookie] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [gameScore, setGameScore] = useState(0);
  const [bugPosition, setBugPosition] = useState({ top: 50, left: 50 });
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pontocom_cookie_consent");
    if (!consent) setShowCookie(true);
    else setAnalyticsEnabled(true);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("pontocom_cookie_consent", "true");
    setShowCookie(false);
    setAnalyticsEnabled(true);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setSplashStep(2), 2000); 
    const timer2 = setTimeout(() => setShowSplash(false), 4500); 
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsStoreOpen(hour >= 14 || hour < 3);
  }, []);

  useEffect(() => {
    const currentWord = TITULOS[wordIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TITULOS.length);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  const moveBug = () => {
    if (gameWon) return;
    const newTop = Math.floor(Math.random() * 60) + 20; 
    const newLeft = Math.floor(Math.random() * 60) + 20;
    setBugPosition({ top: newTop, left: newLeft });
  };

  const catchBug = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); 
    if (gameWon) return;
    const newScore = gameScore + 1;
    setGameScore(newScore);
    if (newScore >= 5) setGameWon(true);
    else moveBug();
  };

  const servicos = [
    { titulo: "Notebooks", desc: "Reparo de telas, teclados, baterias, limpeza interna e formatação completa.", icon: "💻" },
    { titulo: "Computadores", desc: "Manutenção preventiva, corretiva, upgrade de peças e montagem gamer/office.", icon: "🖥️" },
    { titulo: "Celulares & Tablets", desc: "Troca de tela, bateria, conectores e manutenção geral avançada em placas.", icon: "📱" },
    { titulo: "Vendas & Upgrade", desc: "Equipamentos, suprimentos, SSDs, memórias RAM e acessórios em geral.", icon: "⚡" },
    { titulo: "Redes Empresariais", desc: "Cabeamento estruturado, configuração de roteadores e servidores locais.", icon: "🌐" },
    { titulo: "Manutenção Geral", desc: "Diagnóstico completo e orçamento transparente sem compromisso.", icon: "🔧" },
    { titulo: "Atendimento Rápido", desc: "Serviços expressos para urgências do dia a dia. Seu equipamento pronto rápido.", icon: "🚀" },
    { titulo: "Garantia Total", desc: "Todos os serviços executados possuem garantia e utilizamos peças de alta qualidade.", icon: "🛡️" }
  ];

  const faqs = [
    { p: "Vocês cobram para fazer orçamento?", r: "Não! Na Ponto Com, o diagnóstico inicial e o orçamento são totalmente sem compromisso. Você só paga se aprovar o serviço." },
    { p: "Quais são as formas de pagamento?", r: "Aceitamos Pix, cartões de crédito (com opção de parcelamento), débito e dinheiro." },
    { p: "Os serviços possuem garantia?", r: "Sim. Todos os nossos reparos de hardware e trocas de peças acompanham garantia legal para sua total segurança e tranquilidade." },
    { p: "Vocês atendem empresas?", r: "Com certeza. Oferecemos suporte corporativo, montagem de redes e manutenção preventiva em computadores de escritórios e lojas." }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-Z2VT3T5SDB" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z2VT3T5SDB');
            `}
          </Script>
        </>
      )}

      {showSplash && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00040f] transition-opacity duration-1000 px-4">
          {splashStep === 1 ? (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 animate-pulse transition-opacity duration-500">
              <Image src="/logo-pc.png" alt="Ponto Com Informática" fill className="object-contain" priority />
            </div>
          ) : (
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 animate-pulse transition-opacity duration-500 leading-tight">
              A melhor loja com custo beneficio você encontra aqui.
            </h1>
          )}
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#05050a] border border-cyan-500/30 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl shadow-cyan-500/20">
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-white">Termos de Uso e Serviço</h2>
              <button onClick={() => setShowTerms(false)} className="text-gray-400 hover:text-red-400 text-2xl sm:text-3xl font-bold leading-none">&times;</button>
            </div>
            
            {/* TEXTO COMPLETO E INTACTO DOS TERMOS DE USO */}
            <div className="p-4 sm:p-6 overflow-y-auto text-gray-300 text-xs sm:text-sm space-y-4">
              <p><strong>Termos de Uso e Serviço da Ponto Com Informatica De Poços De Caldas LTDA</strong></p>
              <p>Seja Bem-Vindo ao site da Ponto Com Informatica De Poços De Caldas LTDA. Antes de explorar tudo o que temos a oferecer, é importante que você entenda e concorde com algumas regras básicas que regem o uso do nosso site pontocompc.grupozynsa.com, e qualquer outro serviço digital que nós oferecemos, como lojas e plataformas de e-commerce.</p>
              <p>Ao usar nosso site e serviços, você automaticamente concorda em seguir as regras que estabelecemos aqui. Caso não concorde com algo, por favor, considere não usar nossos serviços. É muito importante para nós que você se sinta seguro e informado a todo momento.</p>
              
              <h3 className="text-cyan-400 font-bold mt-4">1. Aceitando os Termos</h3>
              <p>Ao navegar e usar o site da Ponto Com Informatica De Poços De Caldas LTDA, você concorda automaticamente com nossas regras e condições. Estamos sempre procurando melhorar, então esses termos podem mudar de vez em quando. Se fizermos alterações significativas, vamos postar as atualizações aqui no site. Continuar usando o site após essas mudanças significa que você aceita os novos termos.</p>

              <h3 className="text-cyan-400 font-bold mt-4">2. Como Usar o Nosso Site</h3>
              <p>A maior parte do nosso site está aberta para você sem a necessidade de cadastro. No entanto, algumas seções especiais podem exigir que você crie uma conta. Pedimos que você seja honesto ao fornecer suas informações e que mantenha sua senha e login seguros. Se decidir compartilhar algum conteúdo conosco, como comentários, por favor, faça-o de maneira respeitosa e dentro da lei.</p>

              <h3 className="text-cyan-400 font-bold mt-4">3. Sua Privacidade</h3>
              <p>Na Ponto Com Informatica De Poços De Caldas LTDA, a privacidade é um valor essencial. Ao interagir com nosso site, você aceita nossa Política de Privacidade, que detalha nossa abordagem responsável e conforme às leis para o manejo dos seus dados pessoais. Nosso compromisso é com a transparência e a segurança: explicamos como coletamos, usamos e protegemos suas informações, garantindo sua privacidade e oferecendo controle sobre seus dados.</p>
              <p>Adotamos práticas de segurança para proteger suas informações contra acesso não autorizado e compartilhamento indevido, assegurando que qualquer cooperação com terceiros ocorra apenas com base na sua aprovação ou exigências legais claras, reafirmando nosso comprometimento com a sua confiança e segurança digital.</p>

              <h3 className="text-cyan-400 font-bold mt-4">4. Direitos de Conteúdo</h3>
              <p>O conteúdo disponível no site da Ponto Com Informatica De Poços De Caldas LTDA, incluindo, mas não se limitando a, textos, imagens, ilustrações, designs, ícones, fotografias, programas de computador, videoclipes e áudios, constitui propriedade intelectual protegida tanto pela legislação nacional quanto por tratados internacionais sobre direitos autorais e propriedade industrial. Essa propriedade engloba não apenas materiais diretamente produzidos e publicados por nós, mas também conteúdos que são utilizados sob licença ou permissão de terceiros, garantindo que todos os direitos sejam respeitados conforme as normativas vigentes.</p>
              <p>Ao acessar nosso site, você recebe uma licença limitada, não exclusiva e revogável para visualizar e usar o conteúdo para fins pessoais e não comerciais. Isso implica que qualquer reprodução, distribuição, transmissão ou modificação do conteúdo, sem a devida autorização escrita da Ponto Com Informatica De Poços De Caldas LTDA, é estritamente proibida. Tal restrição visa proteger os direitos de propriedade intelectual associados aos materiais disponibilizados, assegurando que sua utilização não infrinja os direitos dos criadores ou detentores desses direitos, além de promover um ambiente de respeito e valorização da criatividade e inovação.</p>

              <h3 className="text-cyan-400 font-bold mt-4">5. Cookies e Mais</h3>
              <p>Utilizamos cookies para melhorar sua experiência, coletando informações anônimas durante sua visita, como suas preferências de idioma, duração da visita, páginas acessadas, e outras estatísticas de uso. Esses dados nos ajudam a personalizar seu conteúdo, otimizar a navegação, melhorar continuamente o site em design e funcionalidade, e garantir sua segurança online. Esta prática é essencial para nos permitir oferecer um serviço mais ajustado às suas necessidades e resolver qualquer problema que possa surgir mais rapidamente.</p>
              <p>Se você preferir limitar ou recusar o uso de cookies, a configuração pode ser ajustada através do seu navegador. Isso pode afetar a sua experiência no site, pois algumas funcionalidades dependem dos cookies para funcionar corretamente. Entendemos a importância do controle sobre suas informações e queremos que você saiba que, ao ajustar as configurações para bloquear cookies, algumas partes do nosso site podem não oferecer a experiência completa pretendida.</p>

              <h3 className="text-cyan-400 font-bold mt-4">6. Explorando Links Externos</h3>
              <p>Nosso site pode incluir links para sites externos que achamos que podem ser do seu interesse. Note que não temos controle sobre esses sites externos e, portanto, não somos responsáveis pelo seu conteúdo ou políticas.</p>

              <h3 className="text-cyan-400 font-bold mt-4">7. Mudanças e Atualizações</h3>
              <p>A evolução é parte de como operamos, o que significa que estes Termos de Uso podem passar por atualizações para refletir melhor as mudanças em nossos serviços ou na legislação. Sempre que isso acontecer, você encontrará a versão mais recente disponível aqui. Se as mudanças forem significativas, faremos o possível para notificá-lo através dos meios de contato que você nos forneceu.</p>
              <p>Continuar a acessar o site após essas mudanças indica que você concorda com os novos termos. Se, por qualquer motivo, você não concordar com as atualizações, pedimos que não continue utilizando nosso site e serviços.</p>

              <h3 className="text-cyan-400 font-bold mt-4">Dúvidas ou Comentários?</h3>
              <p>Se tiver dúvidas sobre estes termos, não hesite em nos contatar através do e-mail <strong>pontocompocos@gmail.com</strong>.</p>
            </div>
            
            <div className="p-4 border-t border-white/10 text-center">
              <button onClick={() => setShowTerms(false)} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold transition-all text-sm">Concordar e Fechar</button>
            </div>
          </div>
        </div>
      )}

      {showCookie && (
        <div className="fixed bottom-0 left-0 w-full z-[70] bg-black/95 border-t border-cyan-500/30 backdrop-blur-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          <p className="text-gray-300 text-[11px] sm:text-xs md:text-sm text-center sm:text-left leading-relaxed">
            Usamos cookies para melhorar sua experiência e analisar nosso tráfego. Ao continuar, você concorda com nossos <button onClick={() => setShowTerms(true)} className="text-cyan-400 underline">Termos de Uso</button>.
          </p>
          <button onClick={handleAcceptCookies} className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl sm:rounded-full font-bold text-sm whitespace-nowrap transition-all">
            Aceitar Cookies
          </button>
        </div>
      )}

      {/* NOVO: BOTÃO FLUTUANTE DO WHATSAPP */}
      <a
        href="https://wa.me/5535998344139"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-[65] flex items-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white p-2 pr-4 sm:p-3 sm:pr-5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.7)] transition-all duration-300 transform hover:scale-105 group"
      >
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Image 
            src="/whatsapp-logo..png" 
            alt="WhatsApp" 
            fill 
            className="object-contain p-1.5 sm:p-2 drop-shadow-lg animate-pulse" 
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-[11px] text-green-100 font-semibold leading-tight uppercase tracking-wider">
            Dúvidas?
          </span>
          <span className="text-xs sm:text-sm font-bold leading-tight">
            Nos chame no Zap!
          </span>
        </div>
        
        {/* Ponto de notificação (balãozinho vermelho chamando atenção) */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-red-500 border-2 border-[#25D366]"></span>
        </span>
      </a>

      <main className="relative min-h-screen flex flex-col font-sans overflow-x-hidden">
        <div className="bg-tech-fullscreen">
          <div className="light-beam-h" style={{ top: '20%', animationDelay: '0s' }}></div>
          <div className="light-beam-h" style={{ top: '75%', animationDelay: '2.5s' }}></div>
          <div className="light-beam-h" style={{ top: '45%', animationDelay: '4s' }}></div>
          <div className="light-beam-v" style={{ left: '15%', animationDelay: '1s' }}></div>
          <div className="light-beam-v" style={{ left: '85%', animationDelay: '3.5s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-between items-center border-b border-white/10 bg-black/40 backdrop-blur-md sm:rounded-b-3xl">
            <div className="relative w-24 h-10 sm:w-32 sm:h-12 md:w-40 md:h-16">
              <Image src="/logo-pc.png" alt="Ponto Com Informática" fill className="object-contain" priority />
            </div>
            <a href="#contato" className="bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-600 text-cyan-300 hover:text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm">
              Fale Conosco
            </a>
          </header>

          <section className="flex flex-col items-center text-center px-4 pt-10 pb-12 sm:pt-20 sm:pb-16 max-w-6xl mx-auto w-full">
            <span className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              A sua assistência técnica de confiança
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-[1.2] min-h-[90px] sm:min-h-[160px] flex flex-col justify-center w-full">
              Sua parceira para <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                {text}<span className="animate-pulse text-cyan-300 font-light">|</span>
              </span>
            </h1>
            
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mb-8 px-2 leading-relaxed">
              Com laboratórios em Poços de Caldas e Machado, somos especialistas em trazer seus equipamentos eletrônicos de volta à vida. Rapidez, transparência e tecnologia de ponta.
            </p>

            <div className="flex flex-col w-full sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a href="#servicos" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all text-center text-sm sm:text-base shadow-lg shadow-blue-500/20">
                Ver Todos os Serviços
              </a>
              <a href="https://wa.me/5535998344139" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebd5a] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base shadow-lg shadow-green-500/20">
                WhatsApp Poços de Caldas
              </a>
            </div>

            <div className="w-full mt-16 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest mb-6 font-bold">Especialistas nas principais marcas</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-60">
                {['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'Dell', 'Lenovo', 'HP', 'Asus'].map((marca, i) => (
                  <span key={i} className="text-white text-lg sm:text-2xl font-bold font-mono tracking-wider">{marca}</span>
                ))}
              </div>
            </div>

            <div className="w-full max-w-3xl mt-16 px-4">
              <a href="https://pontocominformatica.grupozynsa.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 p-5 sm:p-6 rounded-2xl backdrop-blur-md hover:bg-cyan-900/60 transition-all group">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Operação completa no Sul de Minas</span>
                  <strong className="text-white text-lg sm:text-xl block group-hover:text-cyan-300 transition-colors">Conheça nossa Matriz em Machado - MG</strong>
                </div>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap group-hover:bg-cyan-500 group-hover:text-white transition-colors w-full sm:w-auto text-center">
                  Acessar Portal da Matriz
                </span>
              </a>
            </div>
          </section>

          <section className="w-full bg-black/40 py-16 sm:py-24 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6">
                <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest block">Sobre a Ponto Com</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Mais do que consertar, nós resolvemos o seu problema.</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Sabemos o quanto você depende do seu smartphone ou computador no dia a dia. Ficar sem eles não é uma opção. Por isso, a Ponto Com Informática estruturou laboratórios de ponta para garantir que o seu reparo seja feito não apenas com peças de alta qualidade, mas com a agilidade que a sua rotina exige.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border-l-2 border-cyan-500 pl-4">
                    <strong className="text-white text-xl block">+ Anos</strong>
                    <span className="text-gray-400 text-xs sm:text-sm">De experiência no mercado de tecnologia.</span>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-4">
                    <strong className="text-white text-xl block">100%</strong>
                    <span className="text-gray-400 text-xs sm:text-sm">Transparência em todos os orçamentos.</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
                  <div className="relative z-10 text-center p-6">
                    <span className="text-5xl mb-4 block">👨‍💻</span>
                    <h3 className="text-white font-bold text-lg">Laboratório Avançado</h3>
                    <p className="text-cyan-300 text-xs mt-2">Ferramentas de precisão e técnicos capacitados.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="servicos" className="w-full max-w-7xl mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest block mb-2">Nosso Catálogo</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Soluções Completas</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">De uma simples troca de tela à estruturação da rede da sua empresa. Veja tudo o que a Ponto Com pode fazer por você.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {servicos.map((servico, index) => (
                <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col items-start text-left">
                  <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{servico.icon}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{servico.titulo}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{servico.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-7xl mx-auto px-4 pb-16 sm:pb-24">
            <div className="bg-gradient-to-r from-blue-900/40 via-cyan-900/20 to-black border border-cyan-500/30 rounded-3xl p-6 sm:p-12 flex flex-col lg:flex-row items-center gap-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              
              <div className="lg:w-2/3 relative z-10">
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Anuncie Conosco</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Sua marca na melhor loja de Poços e região</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Deseja que sua empresa seja vista por dezenas de clientes todos os dias? Adquira um espaço publicitário em nossa TV interna de mídia digital. É a oportunidade perfeita para dar destaque ao seu negócio dentro da nossa loja física e levar sua marca a outro nível!
                </p>
                <a href="https://wa.me/5535998344139?text=Ol%C3%A1!%20Gostaria%20de%20saber%20como%20anunciar%20a%20minha%20marca%20na%20TV%20da%20Ponto%20Com." target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black font-bold px-6 py-3 rounded-xl text-sm sm:text-base hover:bg-gray-200 transition-colors">Quero Anunciar na TV</a>
              </div>
              
              <div className="lg:w-1/3 w-full relative z-10 flex justify-center">
                <div className="w-full max-w-xs aspect-[4/3] bg-black border-4 border-gray-800 rounded-xl relative overflow-hidden shadow-2xl flex flex-col">
                  <div className="bg-cyan-900 text-white text-[10px] sm:text-xs p-2 font-bold flex justify-between uppercase">
                    <span>ESPAÇO PUBLICITÁRIO</span>
                    <span>Ponto Com</span>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-4 text-center">
                    <p className="text-white font-extrabold text-xl animate-pulse drop-shadow-md">SUA MARCA AQUI</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-20 border-t border-white/5">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Dúvidas Frequentes</h2>
              <p className="text-gray-400 text-sm sm:text-base">Tudo o que você precisa saber antes de trazer seu aparelho.</p>
            </div>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all">
                  <button 
                    onClick={() => toggleFaq(index)} 
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-white font-bold text-sm sm:text-base pr-4">{faq.p}</span>
                    <span className={`text-cyan-400 text-2xl transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-400 text-xs sm:text-sm">{faq.r}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-3xl mx-auto px-4 pb-16 sm:pb-24">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Teste seus reflexos</h2>
              <p className="text-gray-400 text-xs sm:text-sm">Elimine os bugs no toque da tela enquanto decide o que consertar.</p>
            </div>
            <div className="cyber-terminal w-full h-[280px] sm:h-[350px] rounded-xl sm:rounded-2xl p-3 flex flex-col font-mono text-cyan-400 select-none border border-cyan-500/30 bg-black/60">
              <div className="scanline"></div>
              <div className="flex justify-between items-center border-b border-cyan-500/30 pb-2 mb-3 text-[10px] sm:text-xs">
                <div>DIAGNÓSTICO_SISTEMA</div>
                <div>Ameaças: <span className="text-white font-bold bg-cyan-900/50 px-1.5 rounded">[{gameScore}/5]</span></div>
              </div>
              {!gameWon ? (
                <div className="relative flex-grow bg-black/80 rounded border border-cyan-900 overflow-hidden" onClick={moveBug}>
                  <div className="absolute top-2 left-2 text-[8px] sm:text-[10px] text-cyan-700 pointer-events-none">INTERCEPTE O ALVO NA TELA.</div>
                  <div onMouseEnter={moveBug} onClick={catchBug} onTouchStart={catchBug} className="absolute cursor-crosshair transition-all duration-300 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center" style={{ top: `${bugPosition.top}%`, left: `${bugPosition.left}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center animate-pulse text-sm sm:text-lg shadow-[0_0_10px_rgba(239,68,68,0.5)]">👾</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 z-20 px-2">
                  <div className="text-3xl sm:text-4xl">✅</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">SISTEMA LIMPO!</h3>
                  <button onClick={() => { setGameScore(0); setGameWon(false); }} className="mt-2 border border-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-400 hover:text-black font-bold text-xs sm:text-sm active:scale-95 transition-all">REINICIAR</button>
                </div>
              )}
            </div>
          </section>

          <footer id="contato" className="w-full bg-black/90 backdrop-blur-2xl border-t border-white/10 mt-auto pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10">
              
              <div className="text-center md:text-left flex flex-col items-center md:items-start bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/5">
                <span className="text-cyan-400 font-bold text-[10px] uppercase tracking-widest block mb-2">Unidade Poços de Caldas</span>
                <p className="text-white text-sm sm:text-base font-medium mb-1">R. Santa Catarina, 203 - Centro</p>
                <div className="flex items-center gap-2 mt-2 mb-3">
                  {isStoreOpen ? (
                    <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded border border-green-500/30">Aberto Agora (Até 03h)</span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-1 rounded border border-red-500/30">Fechado</span>
                  )}
                </div>
                <p className="text-white text-xl sm:text-2xl font-bold mt-2">(35) 99834-4139</p>
              </div>
              
              <div className="text-center flex flex-col items-center justify-center gap-3">
                <p className="text-gray-300 font-medium text-sm">Já é nosso cliente?</p>
                <a href="https://g.page/r/CXCXKl5i0QS2EAE/review" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-200 text-black px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] text-sm w-full max-w-[280px] active:scale-95">
                  ⭐ Avaliar no Google
                </a>
              </div>

              <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center gap-3">
                <p className="text-gray-300 font-medium text-sm">Siga no Instagram</p>
                <a href="https://www.instagram.com/pontocompocos/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm w-full max-w-[280px] active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  📸 @pontocompocos
                </a>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center text-center gap-3">
              <button onClick={() => setShowTerms(true)} className="text-cyan-400 hover:text-cyan-300 text-[11px] sm:text-xs underline p-2">
                Termos de Uso e Privacidade
              </button>
              <p className="text-gray-500 text-[10px] sm:text-xs max-w-lg leading-relaxed">
                © {new Date().getFullYear()} Todos os direitos reservados. Ponto Com Informatica De Poços De Caldas LTDA - 60.405.936/0001-24.
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs">
                Desenvolvido por <a href="https://grupozynsa.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-bold hover:underline">Grupo Zynsa</a>.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}