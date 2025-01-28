import { Card } from "../../components/ui/Card";

const Index = () => {
  return (
    <div className="flex justify-center text-left">
      <div className="flex flex-col w-full max-w-4xl gap-4 p-4 bg-blue-100 rounded-lg shadow-md">
        <section className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Quero Ajudar
          </h1>
          <p className="text-lg mb-4">
            O Adote Aqui é a{" "}
            <span className="font-bold">
              maior plataforma de adoção de pets
            </span>{" "}
            do Brasil.
          </p>
          <p className="text-lg mb-8">
            Nosso objetivo é conectar doadores e adotantes em todo o Brasil,
            contribuindo para que os animais encontrem novas famílias!
          </p>

          <div className="relative mb-12">
            <img
              src="public/images/photo_cat_dog.jpg"
              alt="Cachorro e gato juntos"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-1 left-24 bg-yellow-100 rounded-full p-6 border-2 border-yellow-400 border-dashed">
              <p className="text-center text-sm md:text-base">
                A cada{" "}
                <span className="text-primary font-bold">R$ 25 doados</span>,
                <br />
                você contribui para a<br />
                adoção de{" "}
                <span className="text-primary font-bold">5 bichinhos</span>!
              </p>
            </div>
          </div>

          <Card className="p-6 mb-12 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-4 ">
              1) Doações via PIX ou transferência
            </h2>
            <p className="mb-4">
              A cada 25 reais, você ajuda 5 doguinhos ou gatinhos. Para doar,
              você pode fazer uma transferência bancária ou PIX:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">PIX:</h3>
                <p>
                  <span className="font-bold">e-mail:</span> adote@email.com.br
                </p>
                <p>ou</p>
                <p>
                  <span className="font-bold">CNPJ:</span> 12.345.678/0001-99
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">TED ou depósito em conta</h3>
                <p>Banco do Brasil</p>
                <p>Agência: 1234-5</p>
                <p>Conta-corrente: 9876-5</p>
                <p>Adote Aqui</p>
                <p>CNPJ: 12.345.678/0001-99</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
