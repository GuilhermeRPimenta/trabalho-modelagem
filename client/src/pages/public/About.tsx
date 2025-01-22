import { useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center text-left">
      <div className="flex flex-col w-full max-w-4xl gap-4 p-4 bg-blue-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold ">Sobre o Amigo</h2>
        <p className="text-md text-justify">
          O "Adote Aqui" é uma das maiores plataformas online para adoção de animais no Brasil. Acreditamos que todo animal de rua merece um lar e nos dedicamos a conectar cães e gatos em abrigos com pessoas dispostas a adotá-los.
        </p>
        <div className="flex justify-center">
        
        </div>
        <h3 className="text-xl font-bold mt-4 ">Como funciona</h3>
        <p className="text-md text-justify">
          Nós não temos abrigos, e nem fazemos resgates de animais! Nosso trabalho é 100% online, oferecendo visibilidade aos animaizinhos que precisam de um lar. Funciona assim:
        </p>
        <ol className="list-decimal list-inside text-md text-justify">
          <li>ONGs, protetores independentes ou pessoas que precisam doar um animal fazem o seu cadastro gratuitamente e no mesmo instante já podem publicar os animais com detalhes sobre suas características e personalidade.</li>
          <li>Pessoas interessadas em ter um novo bichinho entram no site e procuram um que tenha a ver com o perfil desejado.</li>
          <li>Quando encontram aquele especial, clicam em “quero adotar” e combinam com a ONG como buscar o mais novo membro da família.</li>
        </ol>
        <h3 className="text-xl font-bold mt-4 ">Quer divulgar um cão ou gato para adoção?</h3>
        <p className="text-md text-justify">
          Se você está dando lar temporário ou quer divulgar um animal para adoção, faça seu cadastro no site e, em seguida, publique o bichinho. Coloque o máximo de características e fotos sobre ele: assim você aumenta as chances de encontrar alguém que realmente combine com seu perfil, ajudando a evitar decepção e futuros abandonos. Pelo mesmo motivo, seja sincero quanto ao estado de saúde e características do animal.
        </p>
        <p className="text-md text-justify font-bold">
          Importante: este é um site de adoção e a venda de animais é proibida! Usuários que tentarem vender animais serão banidos do site e poderão sofrer processos judiciais.
        </p>
        <h3 className="text-xl font-bold mt-4 ">E que tal adotar um amigo?</h3>
        <Button onClick={() => navigate("/Animals")} className="mt-2">
          Conheça os animais disponíveis para adoção
        </Button>
        <h3 className="text-xl font-bold mt-4 ">Gostou? Apoie nosso trabalho!</h3>
        <p className="text-md text-justify">
          Tem vários jeitos de contribuir com o Adote Aqui, seja como pessoa física ou como empresa parceira.
        </p>
        <h3 className="text-xl font-bold mt-4 ">Siga o Amigo nas redes:</h3>
        <p className="text-md text-justify">
          Nossos perfis no <a href="#" className="text-blue-500 underline">Instagram</a>!! Segue a gente lá!
        </p>
      </div>
    </div>
  );
};

export default About;
