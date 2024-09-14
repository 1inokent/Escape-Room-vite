import { useAppSelector } from '../../store/hook';
import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element | null {
  const errorMessage = useAppSelector((state) => state.error);

  return errorMessage ? <div className={styles.errorMessage}>{errorMessage}</div> : null;
}

export default ErrorMessage;
