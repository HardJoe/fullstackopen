import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notif = useSelector((state) => state.notification);
  const last = notif[notif.length - 1];

  return notif.length > 0 ? (
    <Alert severity={last.success ? 'success' : 'error'}>{last.content}</Alert>
  ) : null;
};

export default Notification;
