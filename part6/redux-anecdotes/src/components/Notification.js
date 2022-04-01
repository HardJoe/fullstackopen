import { connect } from 'react-redux';

const Notification = (props) => {
  const notification = props.notification;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return notification.length > 0 ? (
    <div style={style}>{notification[notification.length - 1]}</div>
  ) : null;
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
