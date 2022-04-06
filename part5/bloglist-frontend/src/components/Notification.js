import { useSelector } from 'react-redux';

const Notification = () => {
  const notif = useSelector((state) => state.notification);
  const last = notif[notif.length - 1];

  return notif.length > 0 ? (
    <div className={last.success ? 'success' : 'error'}>{last.content}</div>
  ) : null;
};

export default Notification;
