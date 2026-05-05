import Brand from "./base/Brand";
import ContactUs from "./ContactUs";
import Links from "./Links";

import styles from "../styles/Footer.module.scss";
import Props from "@/types/Props";

const Footer: React.FC<Props> = (props) => {

  return (
    <div className={`${styles["footer__container"]}`} dir={props.dir}>
      <div
        className={`d-none d-sm-flex flex-row justify-content-around`}
      >
        <ContactUs/>
        <Brand row={true} iconSize={75}></Brand>
        <Links/>
      </div>
      <div className={`d-block d-sm-none`}>
        <Brand row={true} iconSize={75}></Brand>
        <ContactUs/>
        <Links className="mt-3"/>
      </div>
    </div>
  );
};

export default Footer;
