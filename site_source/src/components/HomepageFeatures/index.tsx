import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  to: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Documentação 📚',
    to: '/docs',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Documentação técnica criada pelo S2l2, nossas documentações possuem progressão de nível, começam do básico e vão até o avançado. 
        Como se fosse uma história, onde cada nível é uma nova etapa.
      </>
    ),
  },
  {
    title: 'Curadoria 💡',
    to: '/curadoria',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Selecionamos os melhores conteúdos para você, desde tutoriais até artigos e vídeos. Para aqueles que querem ir direto ao ponto.
      </>
    ),
  },
  {
    title: 'PBL 🤔',
    to: '/pbl',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Problem Based Learning, é um método de ensino que busca desenvolver habilidades de pensamento crítico, resolução de problemas e colaboração. 
        Aprenda enquanto resolve desafios e compartilhe sua solução e aprendizado com outros alunos.
      </>
    ),
  },
];

function Feature({title, to, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
        <div className={styles.buttons}>
          <Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            className="button button--secondary button--lg"
            to={to}>
            {title}
          </Link>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        {/* <Heading as="h3">{title}</Heading> */}

        <p className="padding-top--md">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
