import styles from './label.module.scss';

/* eslint-disable-next-line */
export interface LabelProps {
  data:''
}

export function Label(props: LabelProps) {
  return (
    <div className={styles['container']}>
      <h1>{props.data.message}</h1>
    </div>
  );
}

export default Label;
