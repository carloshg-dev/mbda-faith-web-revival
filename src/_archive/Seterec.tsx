
import { useState } from "react";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";
import { Modal } from "../components/ui/Modal";

const Seterec = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="seterec" className="section-padding" style={{ backgroundColor: 'rgba(0, 140, 227, 0.7)' }}>
        <div className="container mx-auto">
          {/* Título */}
          <div className="text-center mb-16">

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-yellow-title drop-shadow-lg mb-4">
              🎓 S.E.T.E.R.E.C
            </h2>

            <p className="text-xl text-white max-w-3xl mx-auto mt-4">
              (Seminário Teológico da Reconciliação)
            </p>
          </div>

          {/* Conteúdo principal */}
          <div className="max-w-6xl mx-auto text-center">

            {/* Texto centralizado */}
            <div className="mb-12">
              <div className="glass-card-modern inline-block p-8 max-w-4xl">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-lime mr-3" />
                  <h3 className="text-2xl font-bold text-yellow-custom no-hover">Formação Teológica</h3>
                </div>
                <p className="text-white leading-relaxed mb-4">
                  O S.E.T.E.R.E.C é um programa de formação e capacitação para líderes cristãos.
                  Baseado em princípios bíblicos sólidos, prepara discípulos para servir a igreja
                  e a comunidade com excelência.
                </p>
                <p className="text-yellow-custom leading-relaxed">
                  Oferecemos cursos em diversas áreas do ministério cristão, com professores
                  experientes e qualificados.
                </p>
              </div>
            </div>

            {/* Cards de cursos centralizados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card-agenda p-8 text-center">
                <BookOpen className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="font-bold text-yellow-custom mb-3 text-lg">Teologia</h4>
                <p className="text-white">Fundamentos bíblicos e doutrinários</p>
              </div>
              <div className="glass-card-agenda p-8 text-center">
                <Users className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="font-bold text-yellow-custom mb-3 text-lg">Liderança</h4>
                <p className="text-white">Gestão ministerial e pastoral</p>
              </div>
              <div className="glass-card-agenda p-8 text-center">
                <Award className="w-10 h-10 text-white mx-auto mb-4" />
                <h4 className="font-bold text-yellow-custom mb-3 text-lg">Aconselhamento</h4>
                <p className="text-white">Técnicas pastorais e cuidado</p>
              </div>
            </div>



            {/* Botões centralizados */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5513981517913"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-agenda px-8 py-4 text-center font-bold text-lime hover:text-white transition-colors flex items-center justify-center"
              >
                📱 WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="glass-card-modern px-8 py-4 font-bold text-white hover:text-blue-light transition-colors"
              >
                📖 Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="S.E.T.E.R.E.C - Seminário Teológico"
        size="xl"
      >
        <div className="space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-amber-400" />
                Sobre o Seminário
              </h3>
              <p className="text-white/90 leading-relaxed mb-4">
                O Seminário Teológico de Reconciliação Cristã é um centro de formação
                teológica e ministerial, comprometido com o preparo de líderes para
                servir à igreja e à comunidade com excelência.
              </p>
              <p className="text-white/90 leading-relaxed">
                Nossa visão é formar líderes cristãos capacitados, que sejam agentes
                de transformação em suas igrejas e comunidades.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-light" />
                Nossos Cursos Extras
              </h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-bold">Teologia Básica</h4>
                  <p className="text-sm text-white/80">Fundamentos da fé cristã - 1 ano</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-bold">Liderança Cristã</h4>
                  <p className="text-sm text-white/80">Princípios de liderança - 6 meses</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-bold">Aconselhamento</h4>
                  <p className="text-sm text-white/80">Técnicas pastorais - 8 meses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-white/20">
            <p className="text-white/90 mb-4">
              As inscrições estão abertas! Entre em contato para mais informações.
            </p>
            <a
              href="https://wa.me/5513981517913"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              📱 Fale Conosco no WhatsApp
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Seterec;
