const NotificationItem = ({ notification }) => (
  <div
    className="border rounded p-4 cursor-pointer hover:bg-accent"
    onClick={() => handleClick(notification)}
  >
    <div className="font-bold">{notification.title}</div>
    <div>{notification.content}</div>
    <div className="text-sm text-muted-foreground text-right">{notification.date}</div>
  </div>
);

const handleClick = (noti) => {
  // 你自己的 script 跳轉邏輯
  window.location.href = noti.targetUrl;
};

export default NotificationItem;
