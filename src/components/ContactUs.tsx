import styles from "@/styles/ContactUs.module.scss";
import { FormattedMessage } from "react-intl";
import Props from "@/types/Props";

export interface ContactUsItemProps {
  title: string,
  value: string,
  href: string,
  icon: string,
  color: string,
}

const ContactUsItem: React.FC<Props & ContactUsItemProps> = (props) => {
  return (
    <div className={`${props.className} d-flex flex-row`}>
      <span
        className={`${styles["contact-us-item__icon"]} mdi ${props.icon} mt-1`}
      ></span>
      <p className={`${styles["contact-us-item__title"]} my-auto mx-1`}>
        <FormattedMessage id={props.title}/>
      </p>
      <FormattedMessage id={props.value} defaultMessage={props.value}>
        {text => {
          return (
            <a
              href={props.href}
              target="_blank"
              className={`${styles["contact-us-item__value"]} my-auto mx-3`}
              style={{
                color: props.color
              }}
            >
              {text}
            </a>
          )
        }}
      </FormattedMessage>
      
    </div>
  );
};

const ContactUs = () => {
  const items: any[] = [
  ];

  return (
    <div>
      <div className="d-flex flex-row justify-content-sm-center">
        <p className={`${styles["contact-us__title"]}`}>
          <FormattedMessage id="contact.us.title"/>
        </p>
      </div>
      <div className="d-flex flex-column">
        {items.map((item, index) => (
          <ContactUsItem
            title={item.title}
            value={item.value}
            href={item.href}
            icon={item.icon}
            color={item.color}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
