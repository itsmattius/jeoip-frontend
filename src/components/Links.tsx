import styles from '@/styles/Links.module.scss'
import React from 'react';
import Props from '@/types/Props';
import { FormattedMessage } from 'react-intl';
import { getDirection } from '@/lang/locale';

export interface LinkProps {
  title: string,
  href: string,
}

const Link: React.FC<LinkProps & Props> = (props) => {

  const icon = (getDirection() === 'rtl') ? 'mdi-chevron-left' : 'mdi-chevron-right';

  return (
    <a href={props.href} className={`${styles.link} d-flex flex-row my-1`}>
      <span className={`${styles['link__icon']} mdi ${icon} my-auto`}></span>
      <p className={`${styles['link__text']} my-auto mx-1`}>
        <FormattedMessage id={props.title}/>
      </p>
    </a>
  );
};

const Links: React.FC<Props> = (props) => {
  const links = [
  ];

  return (
    <div className={`${props.className} d-flex flex-column`}>
      <p className={`${styles['links__title']}`}>
        <FormattedMessage id="links.title"/>
      </p>
      {links.map((link, index) => (
        <Link title={link.title} href={link.href} key={index}></Link>
      ))}
    </div>
  );
};

export default Links;
