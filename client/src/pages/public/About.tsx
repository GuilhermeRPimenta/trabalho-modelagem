import NavLink from "../../components/global/NavLink";

const About = () => {
  return (
    <div className="flex justify-center text-left">
      <div className="flex flex-col w-full max-w-4xl gap-4 p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sobre o Adote Aqui</h2>
        <p className="text-md text-justify">
          Somos uma plataforma online que conecta doadores e adotantes de
          animais, sejam eles pessoas físicas ou instituições!
        </p>
        <div className="flex justify-center"></div>
        <h3 className="text-xl font-bold  text-center ">Como funciona</h3>
        <p className="text-md text-justify"></p>
        <ol className="list-decimal list-inside text-md text-justify">
          <li>
            ONGs, protetores independentes ou pessoas que precisam doar um
            animal publicam os animais com detalhes sobre suas características e
            personalidade.
          </li>
          <li>
            Pessoas interessadas em adotar um animal ou colaboradores de
            instituições que desejam acolher um animal entram no site e procuram
            um que tenha a ver com o perfil desejado.
          </li>
          <li>
            Quando se interessam por um animal, clicam em "Tenho interesse" para
            informar ao doador que desejam adotar aquele animal.
          </li>
          <li>
            O adotante recebe a solicitação e junto com ela os contatos da
            pessoa interessada para entrar em contato.
          </li>
          <li>Após o acerto, o doador registra que aquele animal foi doado</li>
        </ol>
        <h3 className="text-xl font-bold mt-4 ">
          Possui uma instituição que abriga animais?
        </h3>
        <p className="text-md text-justify">
          Cadastre-se e então cadastre sua instituição! Você poderá adicionar
          colaboradores para fazer doações e adoções para a instituição!
        </p>
        <p className="text-md text-justify font-bold">
          Atenção: este é um site de adoção e a venda de animais é proibida!
        </p>

        <h3 className="text-xl font-bold mt-4 ">
          Gostou? Apoie nosso trabalho!
        </h3>
        <NavLink to="donatios">Doe</NavLink>
        <h3 className="text-xl font-bold mt-4 ">Siga o Amigo nas redes:</h3>
        <p className="text-md text-justify">
          Nosso perfil no{" "}
          <a href="#" className="text-blue-500 underline">
            Instagram
          </a>
          !! Segue a gente lá!
        </p>
      </div>
    </div>
  );
};

export default About;
